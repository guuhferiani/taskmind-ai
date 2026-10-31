# Ação 03: Autenticação de Usuários e Vínculo Seguro por UID

## 📋 Alinhamento com o Plano SENAI
- **Capacidades Técnicas:** `6.` Implementar autenticação e controle de acesso por UID | `2.` Fundamentos de programação.
- **Capacidades Socioemocionais:** `Demonstrar atenção a detalhes` (validação de erros) | `Pensamento analítico` (ciclo de vida de sessão).

---

## 👤 1. Ação Humana Guiada (Firebase Console)
O aluno habilita os métodos de login na nuvem:

1. No Firebase Console, acesse o menu lateral **Criação > Authentication**.
2. Clique no botão **"Primeiros passos"**.
3. Na aba **Sign-in method**, configure os dois métodos:
   - **E-mail/senha:** Clique no provedor, ative a primeira chave (Habilitar) e clique em **Salvar**.
   - **Google:** Clique em Adicionar provedor > Google > Ativar. Selecione o seu e-mail no campo *E-mail de suporte do projeto* e clique em **Salvar**.

---

## 🤖 2. O que a IA executa 100% de forma autônoma
- [x] Criação do contexto de sessão global `src/contexts/AuthContext.jsx` com `onAuthStateChanged`.
- [x] Implementação das funções assíncronas `signUp`, `signIn`, `signInWithGoogle` e `logout`.
- [x] Criação do modal de autenticação estilizado `src/components/AuthModal.jsx` com tradução de erros do Firebase para português.
- [x] Criação da barra superior `src/components/UserNavbar.jsx` exibindo o perfil do usuário e o seu `UID`.
- [x] Integração completa no `src/App.jsx` e commit no repositório Git.

---

## 💬 3. Prompt de Comando para a IA (Zero Digitação Manual)
> **Como usar:** Envie este prompt para a IA criar todo o sistema de login e estado de sessão.

```markdown
Atue como meu Desenvolvedor Sênior.

Implemente de forma autônoma o sistema completo de autenticação no projeto TaskMind:
1. Crie o `src/contexts/AuthContext.jsx`:
   - Use o observador `onAuthStateChanged` para persistência automática de sessão.
   - Forneça os métodos: `signUp(email, password)`, `signIn(email, password)`, `signInWithGoogle()` e `logout()`.
   - Exporte o hook customizado `useAuth()`.
2. Crie o componente `src/components/AuthModal.jsx` (Tailwind CSS):
   - Abas para alternar entre "Entrar" e "Cadastrar".
   - Botão para login direto com Google (`signInWithGoogle`).
   - Mapeamento e exibição de mensagens amigáveis em português para erros como senha fraca, e-mail já existente ou credenciais incorretas.
   - Estados visuais de carregamento durante as requisições assíncronas.
3. Crie o componente `src/components/UserNavbar.jsx`:
   - Exiba o botão de login quando deslogado.
   - Quando logado, exiba o e-mail do usuário, um badge com seu UID (explicando que seus dados são isolados por este identificador) e o botão de Logout.
4. Envolva o aplicativo no `AuthProvider` em `src/App.jsx` e faça o commit: `feat(auth): sistema de autenticacao com email, google e isolamento por UID`.
```

---

## 🔍 4. Auditoria Humana & Capacidades Socioemocionais
- [ ] **Atenção a Detalhes:** Cadastre uma conta de teste no aplicativo e verifique se o usuário aparece listado na aba **Users** do Firebase Authentication.
- [ ] **Pensamento Analítico:** Teste fazer logout e login novamente: a sessão é recuperada instantaneamente sem erro?
- [ ] **Feedback de Erro:** Digite uma senha errada intencionalmente: o app exibe a mensagem amigável em português?
