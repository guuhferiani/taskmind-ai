# Ação 02: Configuração do Firebase Spark e Conexão do SDK

## 📋 Alinhamento com o Plano SENAI
- **Capacidades Técnicas:** `4.` Configurar projeto no Firebase e preparar app com SDK | `2.` Fundamentos de programação.
- **Capacidades Socioemocionais:** `Demonstrar atenção a detalhes` (chaves de ambiente e plano gratuito Spark).

---

## 👤 1. Ação Humana Guiada (Firebase Console)
O aluno opera a nuvem do Google Firebase para criar a infraestrutura gratuita:

1. Acesse [console.firebase.google.com](https://console.firebase.google.com/) com sua conta Google.
2. Clique em **"Adicionar projeto"** (ou *Criar projeto*).
3. Digite o nome: `taskmind-seu-nome` (ou o nome do seu repositório).
4. Desmarque o *Google Analytics* (opcional, para acelerar a criação) e clique em **Criar projeto**.
5. Na página inicial do projeto, clique no ícone da Web (`</>`).
6. No apelido do app, digite `TaskMind Web` e marque a opção:
   *"Configure também o Firebase Hosting para este app"*.
7. Clique em **Registrar app**.
8. Na tela que exibe `const firebaseConfig = { ... }`, copie os valores das propriedades:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

---

## 🤖 2. O que a IA executa 100% de forma autônoma
- [x] Instalação do pacote `firebase` (SDK modular v10+).
- [x] Criação do arquivo de modelo `.env.example` e do arquivo de segredos `.env`.
- [x] Escrita do módulo `src/services/firebase.js` com inicialização limpa e tolerante a erros.
- [x] Criação do componente visual `src/components/FirebaseStatus.jsx` que valida em tempo real se as variáveis estão corretas.
- [x] Registro do commit semântico no Git.

---

## 💬 3. Prompt de Comando para a IA (Zero Digitação Manual)
> **Como usar:** Cole as credenciais copiadas do console dentro do prompt abaixo e envie para a IA.

```markdown
Atue como meu Desenvolvedor Sênior.

Configure a integração com o Firebase no meu projeto com base nestas credenciais do Plano Spark:

API_KEY = [COLE SUA API KEY AQUI]
AUTH_DOMAIN = [COLE SEU AUTH DOMAIN AQUI]
PROJECT_ID = [COLE SEU PROJECT ID AQUI]
STORAGE_BUCKET = [COLE SEU STORAGE BUCKET AQUI]
MESSAGING_SENDER_ID = [COLE SEU SENDER ID AQUI]
APP_ID = [COLE SEU APP ID AQUI]

Tarefas autônomas a executar:
1. Instale o pacote oficial `firebase`.
2. Grave essas credenciais no arquivo `.env` com os prefixos adequados para o Vite (`VITE_FIREBASE_...`).
3. Crie o arquivo `.env.example` com placeholders para servir de documentação.
4. Escreva o arquivo `src/services/firebase.js` inicializando o Firebase App, o Auth (`getAuth`) e o Firestore (`getFirestore`).
5. Crie o componente `src/components/FirebaseStatus.jsx` para exibir visualmente na tela um badge verde ("Firebase Conectado - Spark Free") ou vermelho com mensagem de erro caso falte alguma variável.
6. Atualize o `src/App.jsx` para renderizar o badge de status e faça o commit no Git: `feat(firebase): setup do SDK modular v10 e variaveis de ambiente`.
```

---

## 🔍 4. Auditoria Humana & Capacidades Socioemocionais
- [ ] **Atenção a Detalhes:** O plano do projeto no console exibe "Spark (Gratuito)"?
- [ ] **Segurança de Segredos:** Execute `git status` e verifique se o arquivo `.env` NÃO aparece para ser comitado.
- [ ] **Teste no Navegador:** Ao rodar a aplicação, o badge superior exibe que o Firebase está conectado com sucesso?
