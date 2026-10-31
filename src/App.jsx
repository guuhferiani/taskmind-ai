import React, { useState, useEffect } from 'react'
import FirebaseStatus from './components/FirebaseStatus'
import AuthModal from './components/AuthModal'
import UserNavbar from './components/UserNavbar'
import { useAuth } from './contexts/AuthContext'
import { 
  subscribeUserTasks, 
  createTask, 
  toggleTaskStatus, 
  toggleSubtaskStatus, 
  deleteTask 
} from './services/taskService'
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  PlusCircle, 
  Bot, 
  ShieldCheck, 
  Layers,
  ExternalLink,
  Lock,
  Database
} from 'lucide-react'

export default function App() {
  const { currentUser } = useAuth()
  const [tasks, setTasks] = useState([])
  const [isLoadingTasks, setIsLoadingTasks] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDesc, setNewTaskDesc] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)

  // Sincronização em tempo real com o Cloud Firestore filtrada por UID
  useEffect(() => {
    if (!currentUser) {
      // Tarefas demonstrativas quando deslogado
      setTasks([
        {
          id: 'demo-1',
          title: 'Faça login para salvar suas metas no Firestore',
          description: 'Metas salvas após o login são sincronizadas em tempo real na nuvem.',
          completed: false,
          subtasks: [
            { id: 'd-1', title: 'Criar conta ou entrar com Google', done: false },
            { id: 'd-2', title: 'Testar a persistência em tempo real', done: false }
          ],
          createdAtFormatted: 'Modo Demonstração'
        }
      ])
      return
    }

    setIsLoadingTasks(true)
    const unsubscribe = subscribeUserTasks(
      currentUser.uid,
      (liveTasks) => {
        setTasks(liveTasks)
        setIsLoadingTasks(false)
      },
      (error) => {
        console.error('Erro na escuta do Firestore:', error)
        setIsLoadingTasks(false)
      }
    )

    return () => unsubscribe()
  }, [currentUser])

  // Alternar status da tarefa no Firestore
  const handleToggleTask = async (task) => {
    if (!currentUser) {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))
      return
    }
    try {
      await toggleTaskStatus(task.id, task.completed)
    } catch (err) {
      console.error('Erro ao alternar tarefa:', err)
    }
  }

  // Alternar status de subtarefa no Firestore
  const handleToggleSubtask = async (task, subtaskId) => {
    if (!currentUser) {
      setTasks(prev => prev.map(t => {
        if (t.id === task.id) {
          return {
            ...t,
            subtasks: t.subtasks.map(st => st.id === subtaskId ? { ...st, done: !st.done } : st)
          }
        }
        return t
      }))
      return
    }
    try {
      await toggleSubtaskStatus(task.id, task.subtasks, subtaskId)
    } catch (err) {
      console.error('Erro ao alternar subtarefa:', err)
    }
  }

  // Excluir tarefa no Firestore
  const handleDeleteTask = async (taskId) => {
    if (!currentUser) {
      setTasks(prev => prev.filter(t => t.id !== taskId))
      return
    }
    try {
      await deleteTask(taskId)
    } catch (err) {
      console.error('Erro ao excluir tarefa:', err)
    }
  }

  // Adicionar tarefa manual
  const handleAddTask = async (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    if (!currentUser) {
      setIsAuthModalOpen(true)
      return
    }

    try {
      await createTask(currentUser.uid, {
        title: newTaskTitle,
        description: newTaskDesc,
        subtasks: []
      })
      setNewTaskTitle('')
      setNewTaskDesc('')
    } catch (err) {
      console.error('Erro ao salvar meta no Firestore:', err)
    }
  }

  // Simulação de IA (Ação 05 integrará a API real do Gemini)
  const handleSimulateAiBreakdown = async () => {
    if (!newTaskTitle.trim()) {
      alert('Digite o título da sua meta primeiro para o Gemini analisar!')
      return
    }

    if (!currentUser) {
      setIsAuthModalOpen(true)
      return
    }

    setIsAiLoading(true)
    setTimeout(async () => {
      setIsAiLoading(false)
      const simulatedSubtasks = [
        { id: 'st-1', title: `Definir escopo inicial de: ${newTaskTitle}`, done: false },
        { id: 'st-2', title: 'Consultar documentação oficial e regras de negócio', done: false },
        { id: 'st-3', title: 'Executar testes práticos e validar conformidade LGPD', done: false }
      ]

      try {
        await createTask(currentUser.uid, {
          title: newTaskTitle,
          description: newTaskDesc || 'Meta desdobrada com inteligência artificial.',
          subtasks: simulatedSubtasks
        })
        setNewTaskTitle('')
        setNewTaskDesc('')
      } catch (err) {
        console.error('Erro ao persistir meta da IA:', err)
      }
    }, 900)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Barra de Navegação Superior */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-900">TaskMind AI</h1>
                <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-full border border-indigo-200/60">
                  v0.2 Firestore Ready
                </span>
              </div>
              <p className="text-xs text-slate-500">SENAI SP • Firebase + Gemini</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FirebaseStatus />
            <UserNavbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
            <a 
              href="https://github.com/guuhferiani/taskmind-ai" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Aviso pedagógico caso não esteja logado */}
        {!currentUser && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center space-x-2.5">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Modo Visitante:</strong> Faça login para que suas metas sejam salvas na sua conta do <strong>Cloud Firestore</strong> com isolamento por UID.
              </span>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold text-xs transition-colors shrink-0"
            >
              Entrar / Cadastrar
            </button>
          </div>
        )}

        {/* Banner Principal */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center pointer-events-none">
            <Bot className="w-64 h-64" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-200 text-xs px-3 py-1 rounded-full mb-3 border border-indigo-400/20 backdrop-blur-sm">
              <Database className="w-3.5 h-3.5 text-indigo-300" />
              <span>
                {currentUser 
                  ? `Firestore Conectado • UID: ${currentUser.uid.substring(0, 8)}...` 
                  : 'Ação 04: Persistência NoSQL em Tempo Real'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Transforme grandes metas em planos executáveis com IA.
            </h2>
            <p className="text-indigo-200 text-sm leading-relaxed mb-4">
              Cada meta criada agora é persistida no <strong>Cloud Firestore</strong> em tempo real, vinculada ao seu usuário. Na Ação 05 ativaremos a <strong>API oficial do Gemini</strong> com o Google AI Studio!
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">React + Vite</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">Firebase Auth</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">Firestore CRUD</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">UID Security</span>
            </div>
          </div>
        </div>

        {/* Grade de Trabalho (Formulário à Esquerda / Tarefas à Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card de Criação */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-indigo-600" />
                <span>Nova Meta ou Tarefa</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Digite um objetivo e utilize o assistente para quebrá-lo em passos acionáveis.
              </p>

              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Título da Meta *
                  </label>
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Ex: Aprender a programar com IA"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Descrição (Opcional)
                  </label>
                  <textarea
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    rows={2}
                    placeholder="Detalhes ou observações sobre esta meta..."
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleSimulateAiBreakdown}
                    disabled={isAiLoading}
                    className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium text-xs shadow-md shadow-indigo-100 transition-all disabled:opacity-50"
                  >
                    <Sparkles className={`w-4 h-4 ${isAiLoading ? 'animate-spin' : ''}`} />
                    <span>{isAiLoading ? 'Gerando com IA...' : '✨ Decompor com Gemini'}</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
                  >
                    Criar no Firestore
                  </button>
                </div>
              </form>
            </div>

            {/* Card Informativo sobre LGPD e Segurança */}
            <div className="bg-indigo-50/60 rounded-2xl p-5 border border-indigo-100 text-xs text-indigo-900 flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-1">Privacidade & LGPD Integradas</strong>
                <span>
                  Cada usuário terá seus dados isolados por UID no Cloud Firestore, com direito à eliminação definitiva e sem compartilhamento público.
                </span>
              </div>
            </div>
          </div>

          {/* Lista de Metas e Tarefas */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 min-h-[400px]">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-slate-900">Metas no Cloud Firestore</h3>
                  <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {tasks.length}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {isLoadingTasks ? 'Sincronizando...' : (currentUser ? 'Tempo Real Ativo' : 'Modo Visitante')}
                </span>
              </div>

              {tasks.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-1">Nenhuma meta cadastrada</h4>
                  <p className="text-xs text-slate-400">Crie sua primeira meta ao lado ou use a IA para planejar.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map(task => (
                    <div 
                      key={task.id}
                      className={`p-4 rounded-xl border transition-all ${
                        task.completed 
                          ? 'bg-slate-50/70 border-slate-200/70 opacity-75' 
                          : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <button 
                          onClick={() => handleToggleTask(task)}
                          className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-semibold text-slate-900 ${task.completed ? 'line-through text-slate-500' : ''}`}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                              {task.description}
                            </p>
                          )}

                          {/* Subtarefas */}
                          {task.subtasks && task.subtasks.length > 0 && (
                            <div className="mt-3 pl-3 border-l-2 border-indigo-100 space-y-1.5">
                              {task.subtasks.map(subtask => (
                                <button
                                  key={subtask.id}
                                  onClick={() => handleToggleSubtask(task, subtask.id)}
                                  className="flex items-center space-x-2 text-xs text-left w-full group"
                                >
                                  <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                                    subtask.done 
                                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                                      : 'border-slate-300 group-hover:border-indigo-400'
                                  }`}>
                                    {subtask.done && <CheckCircle2 className="w-3 h-3" />}
                                  </span>
                                  <span className={subtask.done ? 'line-through text-slate-400' : 'text-slate-700'}>
                                    {subtask.title}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}

                          <div className="mt-3 flex items-center space-x-3 text-[11px] text-slate-400">
                            <span>{task.createdAtFormatted || 'Recente'}</span>
                            <span>•</span>
                            <span className="text-indigo-600 font-medium">
                              {task.subtasks?.filter(st => st.done).length || 0}/{task.subtasks?.length || 0} subtarefas
                            </span>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                          title="Excluir meta"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <p>Projeto Integrador desenvolvido para o curso de Aperfeiçoamento Profissional • <strong>SENAI-SP 2026</strong></p>
      </footer>

      {/* Modal de Autenticação */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  )
}
