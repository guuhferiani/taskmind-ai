# Ação 07: Build Otimizado, Firebase CLI e Deploy Público

## 📋 Alinhamento com o Plano SENAI
- **Capacidades Técnicas:** `7.` Publicar front-end estático no Firebase Hosting com URL pública | `2.` Fundamentos de programação.
- **Capacidades Socioemocionais:** `Demonstrar autogestão` (ciclo completo de entrega) | `Inteligência emocional` (testes de aceite em produção).

---

## 👤 1. Ação Humana Guiada (Autorização e Validação Pública)
O aluno conclui a publicação global e autoriza o CLI:

1. Quando a IA executar o comando de login, uma aba será aberta automaticamente no seu navegador.
2. Selecione sua conta Google e clique em **"Permitir"**.
3. No terminal, a mensagem *Success! Logged in as seu-email@gmail.com* será exibida.
4. Após o deploy, a IA fornecerá a URL pública (ex: `https://taskmind-seu-nome.web.app`).
5. Acesse a URL no seu computador e também pelo navegador do seu celular para testar em ambiente real!

---

## 🤖 2. O que a IA executa 100% de forma autônoma
- [x] Criação do arquivo de configuração de deploy `firebase.json` com regras de reescrita para Single Page Application (SPA).
- [x] Configuração do `.firebaserc` apontando para o ID do projeto no Firebase.
- [x] Execução do comando de build de produção (`npm run build`) gerando os artefatos otimizados na pasta `dist/`.
- [x] Disparo do comando `firebase deploy --only hosting` via terminal.
- [x] Tag final de versão e commit de entrega no Git.

---

## 💬 3. Prompt de Comando para a IA (Zero Digitação Manual)
> **Como usar:** Envie este comando para a IA empacotar a aplicação e fazer a publicação oficial.

```markdown
Atue como meu Engenheiro DevOps.

Realize o build e a publicação do TaskMind no Firebase Hosting:
1. Crie o arquivo `firebase.json` com a configuração de hosting:
   - Diretório público: `dist`
   - Rewrites: direcionar todas as URLs para `/index.html` (comportamento SPA).
2. Crie o arquivo `.firebaserc` com o ID do meu projeto: [INSERIR_PROJECT_ID_AQUI].
3. Adicione ao `package.json` o script `"deploy": "npm run build && firebase deploy --only hosting"`.
4. Execute o build de produção (`npm run build`) e verifique se não houve erros de compilação.
5. Inicie o deploy para o Firebase Hosting e me retorne a URL pública final gerada.
6. Crie a tag Git de release `v1.0.0` e faça o commit de fechamento: `chore(release): aplicacao publicada no Firebase Hosting v1.0.0`.
```

---

## 🔍 4. Auditoria Humana & Validação de Aceite Final
Abra a URL pública e valide:

- [ ] **Acesso Seguro (HTTPS):** A URL possui cadeado de segurança SSL emitido pelo Google?
- [ ] **Fluxo Ponta a Ponta:** Cadastro -> Login -> Criar tarefa -> Decompor com Gemini -> Marcar concluído.
- [ ] **Recarregamento (F5):** Ao recarregar a página ou navegar, a tela carrega sem erro 404 (graças ao rewrite do Hosting)?
- [ ] **Entrega do Curso:** O aluno concluiu com sucesso todas as 8 Capacidades Técnicas e as 4 Capacidades Socioemocionais do SENAI!
