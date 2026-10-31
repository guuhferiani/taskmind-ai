# Ação 05: Integração da API do Gemini e Engenharia de Prompts no App

## 📋 Alinhamento com o Plano SENAI
- **Capacidades Técnicas:** `1.` Aplicar Gemini com prompts e IA generativa | `8.` Qualidade, segurança e IA responsável.
- **Capacidades Socioemocionais:** `Pensamento analítico` (mitigação de alucinações) | `Atenção a detalhes` (saídas JSON estruturadas).

---

## 👤 1. Ação Humana Guiada (Google AI Studio)
O aluno obtém a chave de API gratuita para habilitar a inteligência generativa:

1. Acesse [aistudio.google.com](https://aistudio.google.com/) e faça login com sua conta Google.
2. No menu lateral ou superior, clique em **"Get API key"**.
3. Clique em **"Create API key"** (selecione seu projeto do Firebase/Google Cloud existente ou crie uma nova chave em novo projeto).
4. Copie a chave de API gerada (ex: `AIzaSy...`).

---

## 🤖 2. O que a IA executa 100% de forma autônoma
- [x] Adição da chave `VITE_GEMINI_API_KEY` ao arquivo `.env`.
- [x] Criação do serviço `src/services/geminiService.js` com comunicação via API oficial do Gemini.
- [x] Aplicação de Engenharia de Prompts com *System Instructions* para forçar respostas em JSON puro.
- [x] Implementação de filtro de IA Responsável (recusa ética de comandos prejudiciais) e sanitização anti-alucinação.
- [x] Criação do botão inteligente `src/components/AIAssistantButton.jsx` integrado ao formulário de tarefas.
- [x] Commit semântico no Git.

---

## 💬 3. Prompt de Comando para a IA (Zero Digitação Manual)
> **Como usar:** Cole sua chave do Google AI Studio no prompt abaixo e envie para a IA.

```markdown
Atue como meu Desenvolvedor Sênior e Especialista em IA Generativa.

Integre a API do Gemini ao aplicativo TaskMind usando esta chave gratuita:
GEMINI_API_KEY = [COLE SUA CHAVE DO GOOGLE AI STUDIO AQUI]

Tarefas autônomas a executar:
1. Grave a chave no arquivo `.env` como `VITE_GEMINI_API_KEY`.
2. Crie o arquivo de serviço `src/services/geminiService.js`:
   - Envie requisição para o endpoint oficial dos modelos `gemini-1.5-flash` ou `gemini-2.5-flash`.
   - Use uma System Instruction rigorosa: "Você é um assistente de planejamento do TaskMind. Receba o objetivo do usuário e decomponha em 3 a 5 subtarefas práticas e executáveis. Responda ESTRITAMENTE em formato JSON puro: [{\"title\": \"Passo 1\"}, {\"title\": \"Passo 2\"}]. Não use markdown nem comentários adicionais."
   - IA Responsável: Adicione diretriz para recusar conteúdo que promova ilegalidades ou danos.
   - Implemente um parser com regex/tratamento para limpar possíveis delimitadores ```json que o modelo gere por alucinação antes de chamar `JSON.parse`.
3. Crie o componente `src/components/AIAssistantButton.jsx` com ícone de varinha mágica ("✨ Decompor meta com Gemini"), com estados de loading e tratamento amigável de limites de requisição.
4. Conecte o botão ao `TaskForm.jsx` para que as subtarefas geradas pela IA apareçam preenchidas automaticamente para o usuário.
5. Faça o commit: `feat(gemini): integracao com api do gemini para desdobramento inteligente de metas`.
```

---

## 🔍 4. Auditoria Humana & Capacidades Socioemocionais
- [ ] **Pensamento Analítico (Alucinações):** Digite uma meta complexa no app (ex: "Criar meu portfólio no GitHub") e clique no botão do Gemini: a IA gerou passos coerentes e bem divididos?
- [ ] **IA Responsável:** Teste digitar uma frase inadequada: o sistema trata com segurança sem quebrar o app?
- [ ] **Robustez:** Se a chave de API estiver incorreta, o app exibe uma mensagem clara em vez de travar a tela?
