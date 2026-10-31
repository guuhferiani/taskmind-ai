import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore'
import { db } from './firebase'

const TASKS_COLLECTION = 'tasks'

/**
 * Escuta em tempo real as tarefas pertencentes exclusivamente ao UID do usuário logado.
 * Implementa o isolamento de dados por UID (princípio de segurança e LGPD).
 */
export function subscribeUserTasks(userId, onTasksUpdate, onError) {
  if (!userId) {
    onTasksUpdate([])
    return () => {}
  }

  const tasksRef = collection(db, TASKS_COLLECTION)
  
  // Consulta filtrada estritamente pelo UID do usuário
  const q = query(
    tasksRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )

  return onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map(docSnap => {
        const data = docSnap.data()
        return {
          id: docSnap.id,
          ...data,
          // Formatação amigável da data de criação
          createdAtFormatted: data.createdAt?.toDate 
            ? data.createdAt.toDate().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            : 'Recente'
        }
      })
      onTasksUpdate(tasks)
    },
    (error) => {
      console.error('[Firestore] Erro ao sincronizar tarefas:', error)
      if (onError) onError(error)
    }
  )
}

/**
 * Cria uma nova meta/tarefa associada ao UID do usuário autenticado.
 */
export async function createTask(userId, { title, description = '', subtasks = [] }) {
  if (!userId || !title.trim()) {
    throw new Error('Usuário autenticado e título são obrigatórios.')
  }

  const tasksRef = collection(db, TASKS_COLLECTION)
  
  return addDoc(tasksRef, {
    userId,
    title: title.trim(),
    description: description.trim(),
    subtasks: subtasks.map((st, index) => ({
      id: st.id || `st-${index + 1}`,
      title: st.title,
      done: Boolean(st.done)
    })),
    completed: false,
    createdAt: serverTimestamp()
  })
}

/**
 * Alterna o status de conclusão da tarefa principal.
 */
export async function toggleTaskStatus(taskId, currentStatus) {
  const taskRef = doc(db, TASKS_COLLECTION, taskId)
  return updateDoc(taskRef, {
    completed: !currentStatus
  })
}

/**
 * Alterna o status de conclusão de uma subtarefa específica dentro do array de subtarefas.
 */
export async function toggleSubtaskStatus(taskId, subtasks, subtaskId) {
  const taskRef = doc(db, TASKS_COLLECTION, taskId)
  const updatedSubtasks = subtasks.map(st => 
    st.id === subtaskId ? { ...st, done: !st.done } : st
  )
  return updateDoc(taskRef, {
    subtasks: updatedSubtasks
  })
}

/**
 * Exclui permanentemente uma tarefa do Firestore.
 */
export async function deleteTask(taskId) {
  const taskRef = doc(db, TASKS_COLLECTION, taskId)
  return deleteDoc(taskRef)
}

