# Ação 04: Persistência de Dados no Cloud Firestore (CRUD & Consultas)

## 📋 Alinhamento com o Plano SENAI
- **Capacidades Técnicas:** `5.` Implementar persistência no Firestore com CRUD e consultas | `2.` Fundamentos de programação.
- **Capacidades Socioemocionais:** `Pensamento analítico` (modelagem NoSQL vs SQL) | `Inteligência emocional` (depuração com tolerância a falhas).

---

## 👤 1. Ação Humana Guiada (Firebase Console)
O aluno provisiona o banco de dados NoSQL gratuito:

1. No Firebase Console, acesse o menu **Criação > Firestore Database**.
2. Clique no botão **"Criar banco de dados"**.
3. No campo **Local do banco de dados**, escolha `southamerica-east1` (São Paulo) ou `us-central1`.
4. Em **Regras de segurança**, selecione **"Iniciar no modo de teste"** (para facilitar a prototipagem inicial; blindaremos as regras na Ação 06).
5. Clique em **Ativar**.

---

## 🤖 2. O que a IA executa 100% de forma autônoma
- [x] Criação do serviço `src/services/taskService.js` com o CRUD completo (Create, Read, Update, Delete).
- [x] Implementação de escuta em tempo real (`onSnapshot`) com filtro obrigatório por `userId == user.uid`.
- [x] Criação do formulário `src/components/TaskForm.jsx` com validações.
- [x] Criação da lista interativa `src/components/TaskList.jsx` com alternância de status, subtarefas e exclusão.
- [x] Conexão no `src/App.jsx` e commit no Git.

---

## 💬 3. Prompt de Comando para a IA (Zero Digitação Manual)
> **Como usar:** Envie este comando para a IA construir toda a camada de banco de dados e interface.

```markdown
Atue como meu Desenvolvedor Sênior.

Implemente de forma autônoma a persistência de dados em tempo real com o Cloud Firestore no app TaskMind:
1. Crie o arquivo `src/services/taskService.js`:
   - Implemente `subscribeUserTasks(userId, callback)` usando `onSnapshot`, `where('userId', '==', userId)` e ordenação por `createdAt desc`.
   - Implemente `createTask(userId, { title, description, subtasks })` usando `addDoc` e `serverTimestamp()`.
   - Implemente `toggleTaskStatus(taskId, currentStatus)` usando `updateDoc`.
   - Implemente `toggleSubtaskStatus(taskId, subtasks, subtaskId)` para marcar/desmarcar itens da lista de subtarefas.
   - Implemente `deleteTask(taskId)` usando `deleteDoc`.
2. Crie o componente `src/components/TaskForm.jsx` para adicionar metas/tarefas com título e descrição.
3. Crie o componente `src/components/TaskList.jsx` exibindo as tarefas em tempo real, permitindo marcar como concluída, expandir subtarefas e excluir.
4. Integre tudo ao `src/App.jsx` garantindo que o usuário só veja suas tarefas quando estiver autenticado.
5. Faça o commit: `feat(firestore): servico de tarefas com CRUD em tempo real e isolamento por usuario`.
```

---

## 🔍 4. Auditoria Humana & Capacidades Socioemocionais
- [ ] **Pensamento Analítico:** Abra o Firestore no console do Firebase e adicione uma tarefa no app: o documento apareceu na coleção `tasks` com o campo `userId` idêntico ao seu UID?
- [ ] **Tempo Real:** Altere o status da tarefa no app: o Firestore atualizou instantaneamente sem precisar recarregar a página?
- [ ] **Isolamento de Dados:** Ao deslogar e logar com outra conta, a lista de tarefas da primeira conta fica oculta?
