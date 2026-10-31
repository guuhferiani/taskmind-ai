# Ação 01: Setup do Repositório GitHub, Estrutura do App e Git Local

## 📋 Alinhamento com o Plano SENAI
- **Capacidades Técnicas:** `1.` Aplicar Gemini com prompts | `2.` Fundamentos de programação | `3.` Prototipagem e Git.
- **Capacidades Socioemocionais:** `Pensamento analítico` (arquitetura) | `Autogestão` (versionamento e autenticação de ambiente).

---

## 👤 1. Ação Humana Guiada (GitHub & Autenticação no Laboratório SENAI)

Nas máquinas do laboratório do SENAI, o Git precisa dos seus dados de perfil e de uma autorização inicial no navegador para liberar o envio dos arquivos.

### Etapa A: Criar o Repositório no GitHub
1. Acesse [github.com](https://github.com/) e faça login.
2. Clique no botão verde **"New"** (ou no `+` superior direito > *New repository*).
3. Preencha:
   - **Repository name:** Ex: `taskmind-ai` ou `sparktask-ai`.
   - **Description:** `Aplicativo inteligente com Firebase Spark e Gemini AI - Curso SENAI SP`.
   - **Public / Private:** Selecione **Public**.
   - **IMPORTANTE:** Não marque *"Add a README"*, nem *.gitignore* (a IA criará tudo localmente).
4. Clique em **"Create repository"**.
5. Copie a URL gerada (ex: `https://github.com/seu-usuario/taskmind-ai.git`).

---

### Etapa B: Configurar Perfil e Autenticar no Terminal do Antigravity
Abra o terminal integrado no Antigravity pressionando as teclas **`Ctrl + J`**:

1. **Configurar seus dados de autor no Git:**
   ```bash
   git config --global user.name "SeuNomeDeUsuario"
   git config --global user.email "seu-email@email.com"
   ```

2. **Autenticar e enviar os arquivos (dispara o Pop-up do GitHub no navegador):**
   ```bash
   git push -u origin main --force
   ```
   > 💡 **Nota para o ambiente SENAI:** Assim que você rodar esse comando no terminal, o Windows/Git abrirá uma janela pop-up do navegador com o botão verde *"Sign in with your browser"*. Basta clicar em autorizar e pronto: os arquivos subirão para o GitHub imediatamente!

---

## 🤖 2. O que a IA executa 100% de forma autônoma
A IA assume toda a construção do projeto no workspace:
- [x] Criação do projeto React com Vite na pasta atual.
- [x] Instalação do Tailwind CSS e dependências essenciais.
- [x] Criação de toda a estrutura de pastas (`src/services`, `src/components`, `src/contexts`).
- [x] Geração do componente base responsivo (`src/App.jsx`).
- [x] Criação do `.gitignore` com proteção estrita para `.env`, `node_modules` e `dist/`.
- [x] Inicialização do Git local (`git init`), configuração da branch `main` e commit inicial semântico.
- [x] Vinculação do endereço remoto (`git remote add origin URL`).

---

## 💬 3. Prompt de Comando para a IA (Zero Digitação Manual)
> **Como usar:** Cole a URL do seu repositório do GitHub no prompt abaixo e envie para a IA.

```markdown
Atue como meu Desenvolvedor Sênior.

Execute de forma autônoma a Ação 01 no meu workspace preparando para o ambiente de laboratório do SENAI:
1. Inicialize o projeto React usando Vite e instale o Tailwind CSS para o layout moderno e responsivo do TaskMind.
2. Crie a estrutura de diretórios em `src/`:
   - `src/services/`
   - `src/components/`
   - `src/contexts/`
3. Crie o arquivo `.gitignore` garantindo a exclusão de `.env`, `.env.local`, `node_modules` e `dist/`.
4. Crie o arquivo inicial `src/App.jsx` com o layout base do TaskMind (cabeçalho com status, card para criação de metas e lista preliminar de tarefas).
5. Inicialize o repositório Git local, configure a branch principal como `main` e registre o commit inicial:
   `git commit -m "feat: setup inicial do projeto com Vite e Tailwind"`.
6. Vincule o repositório remoto com o comando:
   `git remote add origin [COLE_AQUI_A_URL_DO_SEU_GITHUB]`.
7. Me avise assim que estiver pronto para que eu execute o comando de autenticação no terminal (`Ctrl + J`) para abrir o pop-up do navegador!
```

---

## 🔍 4. Auditoria Humana & Capacidades Socioemocionais
- [ ] **Atenção a Detalhes:** O comando `git push -u origin main --force` abriu a janela de autorização do GitHub no navegador?
- [ ] **Autogestão:** Ao atualizar a página do repositório no GitHub (F5), todos os arquivos e o commit da IA aparecem publicados?
