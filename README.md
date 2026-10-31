# TaskMind AI 🧠✨

> **Aplicativo Inteligente de Gestão de Metas e Produtividade**  
> Desenvolvido para o curso de Aperfeiçoamento Profissional: *Criação de Aplicativos com Google Firebase e Gemini* — **SENAI-SP**.

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Spark_Tier-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Gemini API](https://img.shields.io/badge/Google_Gemini-AI_Studio-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)

---

## 📌 Sobre o Projeto

O **TaskMind AI** é um protótipo funcional de aplicativo web moderno que combina a persistência em nuvem e tempo real do **Google Firebase** com a inteligência generativa do **Google Gemini**.

O objetivo do aplicativo é permitir que o usuário defina grandes metas pessoais ou profissionais e utilize a IA generativa como copiloto para desdobrar automaticamente objetivos complexos em subtarefas acionáveis e práticas.

---

## 🚀 Tecnologias e Serviços Utilizados

- **Front-end:** React + Vite + Tailwind CSS (Interface rápida, responsiva e moderna)
- **Autenticação:** Firebase Authentication (E-mail/Senha, Google Sign-In e isolamento de sessão por `UID`)
- **Banco de Dados NoSQL:** Cloud Firestore (Sincronização em tempo real e modelagem orientada a documentos)
- **Inteligência Artificial:** Google Gemini API (Engenharia de prompts, saídas estruturadas em JSON e IA responsável)
- **Hospedagem & Deploy:** Firebase Hosting (URL pública com certificado SSL gratuito)
- **Conformidade & Ética:** Princípios de LGPD (direito de eliminação e privacidade) e mitigação de alucinações de IA.

---

## 🛠️ Como Executar o Projeto Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/guuhferiani/taskmind-ai.git
cd taskmind-ai
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:
```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_GEMINI_API_KEY=sua_chave_do_google_ai_studio
```

### 4. Executar em modo de desenvolvimento
```bash
npm run dev
```

### 5. Compilar para produção
```bash
npm run build
```

---

## 📂 Organização Curricular (SENAI-SP)

Este repositório atende às 8 Capacidades Técnicas e 4 Capacidades Socioemocionais da Unidade Curricular de 32 horas:
- `Ação 01:` Concepção do app, estrutura front-end e versionamento Git (Marco 1).
- `Ação 02:` Configuração do Firebase Spark e inicialização do SDK modular v10.
- `Ação 03:` Autenticação com e-mail/senha, Google e vínculo por UID.
- `Ação 04:` Persistência de dados NoSQL com Cloud Firestore e tempo real.
- `Ação 05:` Integração com a API do Gemini, engenharia de prompts e mitigação de alucinações.
- `Ação 06:` Blindagem com Firestore Security Rules e módulo de conformidade LGPD.
- `Ação 07:` Build otimizado e deploy no Firebase Hosting (Marco 2).

---

## 📄 Licença e Uso Didático
Projeto desenvolvido para fins educacionais e formativos no SENAI-SP.

