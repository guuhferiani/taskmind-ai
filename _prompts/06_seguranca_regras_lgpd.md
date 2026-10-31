# Ação 06: Blindagem de Segurança (Security Rules), LGPD e Privacidade

## 📋 Alinhamento com o Plano SENAI
- **Capacidades Técnicas:** `8.` Aplicar princípios de qualidade, segurança e LGPD | `6.` Controle de acesso básico com vínculo por UID.
- **Capacidades Socioemocionais:** `Demonstrar atenção a detalhes` (regras e permissões) | `Pensamento analítico` (compliance e privacidade).

---

## 👤 1. Ação Humana Guiada (Firebase Console - Regras)
O aluno audita e publica as regras que impedem vazamento de dados:

1. No Firebase Console, acesse **Criação > Firestore Database**.
2. Clique na aba superior **"Regras" (Rules)**.
3. Substitua o conteúdo do editor pelas regras geradas pela IA no arquivo local `firestore.rules`.
4. Clique no botão azul **"Publicar"** (Publish).
5. O console exibirá a mensagem de que as novas regras estão ativas.

---

## 🤖 2. O que a IA executa 100% de forma autônoma
- [x] Criação do arquivo local `firestore.rules` com regras rigorosas de segurança por `request.auth.uid`.
- [x] Criação do componente de conformidade LGPD `src/components/PrivacySettingsModal.jsx`.
- [x] Implementação da rotina de direito à eliminação definitiva de dados (exclusão de tarefas do usuário + exclusão da conta no Firebase Auth).
- [x] Integração do botão de privacidade na barra de navegação e commit no Git.

---

## 💬 3. Prompt de Comando para a IA (Zero Digitação Manual)
> **Como usar:** Envie este comando para a IA blindar o projeto e implementar a LGPD.

```markdown
Atue como meu Especialista em Segurança Cloud e Compliance LGPD.

Execute a blindagem de segurança e os requisitos de privacidade no TaskMind:
1. Crie o arquivo `firestore.rules` na raiz do projeto com as regras:
   - Bloqueio global por padrão.
   - Na coleção `/tasks/{taskId}`:
     - Permita leitura (read), atualização (update) e exclusão (delete) APENAS se `request.auth != null && resource.data.userId == request.auth.uid`.
     - Permita criação (create) APENAS se `request.auth != null && request.resource.data.userId == request.auth.uid` com validação de formato do título.
2. Crie o componente `src/components/PrivacySettingsModal.jsx`:
   - Texto informativo transparente explicando quais dados são armazenados (apenas e-mail e tarefas) e que os dados não são usados para treinamento público.
   - Botão para o usuário exercer o Direito de Eliminação (LGPD): ao confirmar com aviso sonoro/visual, o app exclui todas as tarefas do usuário no Firestore e encerra a conta no Auth (`user.delete()`).
3. Adicione um link sutil no rodapé ou navbar para abrir o modal de Privacidade & LGPD.
4. Faça o commit: `feat(security): regras de seguranca do firestore e modulo de privacidade LGPD`.
```

---

## 🔍 4. Auditoria Humana & Capacidades Socioemocionais
- [ ] **Atenção a Detalhes (Simulador de Regras):** No Firebase Console, use o simulador de regras tentando ler a coleção sem autenticação: a leitura foi bloqueada com `Permission Denied`?
- [ ] **LGPD e Direito do Titular:** Crie uma conta descartável de teste, adicione tarefas e clique no botão "Excluir Minha Conta e Dados". Verifique se a conta desapareceu do Firebase Auth e se as tarefas sumiram do Firestore.
