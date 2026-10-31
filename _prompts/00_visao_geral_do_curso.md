# Visão Geral do Projeto: Metodologia Orquestrador com IA

> **Unidade Curricular:** Criação de Aplicativos com Google Firebase e Gemini (32h)  
> **Instituição:** SENAI-SP  
> **Metodologia:** Aprendizagem Baseada em Projetos (ABP) com **IA Autônoma & Humano Orquestrador**

---

## 1. O Novo Papel do Aluno: Engenheiro-Orquestrador
Neste formato dinâmico e acelerado, **o aluno não perde tempo digitando código linha por linha**. 

- 🤖 **A Inteligência Artificial (Antigravity/Gemini):** Atua como o *Desenvolvedor Sênior*. Ela gera 100% da arquitetura, escreve os componentes, configura os arquivos de serviço, instala dependências e executa os scripts de build e teste.
- 👤 **O Aluno (Orquestrador & Arquiteto Cloud):** Comanda as diretrizes, opera as plataformas de nuvem (Firebase Console e Google AI Studio), cria o repositório no GitHub, autentica nos terminais do laboratório SENAI (`Ctrl + J`) e audita as regras de segurança e LGPD.

---

## 2. Matriz de Ações Divididas (IA vs Humano)

| Ação | Arquivo | 🤖 Ação da IA (100% do Código) | 👤 Ação Humana (Plataformas & Cloud) |
| :--- | :--- | :--- | :--- |
| **01** | `01_concepcao_estrutura_git.md` | Cria o projeto Vite+React, Tailwind, pastas e Git local. | Cria repo no GitHub e faz push no terminal (`Ctrl + J`). |
| **02** | `02_firebase_spark_setup.md` | Cria `.env`, `.env.example`, `firebase.js` e badge de status. | Cria projeto no Firebase Console (Spark) e copia chaves. |
| **03** | `03_autenticacao_uid.md` | Cria `AuthContext.jsx`, modais de login e fluxo de sessão. | Habilita métodos E-mail/Senha e Google no Console. |
| **04** | `04_firestore_crud.md` | Cria `taskService.js`, formulário e lista em tempo real. | Ativa o Cloud Firestore Database no Console. |
| **05** | `05_gemini_api_ia_responsavel.md` | Cria `geminiService.js`, prompt de sistema e botão de IA. | Gera a API Key gratuita no Google AI Studio. |
| **06** | `06_seguranca_regras_lgpd.md` | Cria `firestore.rules` e modal de exclusão e LGPD. | Publica as regras no console e audita acessos. |
| **07** | `07_hosting_deploy_publico.md` | Configura `firebase.json`, compila o app (`dist`) e testa. | Faz login com Google via CLI e valida a URL pública. |

---

## 3. Dica Importante para os Laboratórios do SENAI
Nas máquinas de aula do SENAI, o Git precisa da autorização individual do aluno via navegador. Por isso, a IA prepara todo o código e repositório local, e o aluno executa no terminal do Antigravity (**`Ctrl + J`**):
```bash
git config --global user.name "SeuNome"
git config --global user.email "seu-email@email.com"
git push -u origin main --force
```
Isso aciona o pop-up de login do GitHub no navegador com segurança sem travar o processo.

---

## 4. Diretrizes de Custo Zero (100% Gratuito)
- **Firebase:** Plano Spark (sem necessidade de cadastrar cartão de crédito).
- **Google AI Studio:** Free Tier da API do Gemini (até 15 RPM gratuitas).
- **GitHub & Ferramentas:** Repositório gratuito público ou privado.
