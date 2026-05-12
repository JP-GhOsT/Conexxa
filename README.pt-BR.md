# 🚀 Conexxa — Plataforma de Grupos de Estudo

🇺🇸 English version: [README in English](./README.md)

---

## 📌 Sobre o Projeto

O **Conexxa** é uma plataforma full stack desenvolvida para conectar estudantes em grupos de estudo, permitindo criação, participação e gerenciamento de grupos com sistema de solicitações e administração.

---

## 🎯 Objetivo

Facilitar a organização de grupos de estudo com controle de acesso, promovendo colaboração entre estudantes.

---

## ⚙️ Funcionalidades

### 👤 Usuário
- Cadastro e login (JWT)
- Visualização de grupos
- Solicitação para entrar em grupos
- Acompanhamento do status da solicitação

### 🧑‍🏫 Administrador (criador do grupo)
- Criar grupos de estudo
- Editar informações do grupo
- Visualizar solicitações
- Aceitar ou rejeitar membros
- Gerenciar seus próprios grupos

---

## 🧠 Tecnologias Utilizadas

### Frontend
- React.js
- React Router DOM
- Axios
- React Toastify

### Backend
- Node.js
- Express
- SQLite
- JWT Authentication
- UUID

---

## 📡 API (Resumo)

### 🔐 Autenticação
- POST `/auth/register`
- POST `/auth/login`

### 👥 Grupos
- POST `/groups/study-groups`
- GET `/groups/study-groups`
- GET `/groups/study-groups/:id`
- PUT `/groups/study-groups/:id`

### 📥 Solicitações
- POST `/groups/study-groups/:groupId/join-request`
- GET `/groups/study-groups/:groupId/join-request-status`
- GET `/groups/study-groups/:groupId/requests`

### 🛠️ Administração
- GET `/groups/my-admin-groups`
- PATCH `/groups/study-groups/:groupId/requests/:userId/accept`
- PATCH `/groups/study-groups/:groupId/requests/:userId/reject`

---

## 🗄️ Modelo de Dados

### Users
- id
- nome_completo
- email
- senha_hash

### Groups
- id
- subject
- objective
- location_type
- participant_limit
- creator_id

### Group Memberships
- id
- group_id
- user_id
- status (PENDING | ACCEPTED | REJECTED)
- created_at
- updated_at

---

## 🧩 Arquitetura

```
Frontend (React)
    ↓
API REST (Express)
    ↓
SQLite Database
``` id="arch1"

---

## 🔐 Segurança

- Autenticação via JWT
- Middleware de proteção de rotas
- Controle de acesso por usuário e admin
- Validação de permissões por grupo

---

## 🚀 Como executar o projeto

### 🔧 Backend
```bash
cd backend
npm install
node src/server.js
```

### 💻 Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📊 Status do Projeto

✔ Autenticação completa  
✔ CRUD de grupos  
✔ Sistema de solicitações  
✔ Painel administrativo  
✔ Edição de grupos  
✔ Integração frontend + backend  

---

## 👨‍💻 Equipe

- João Paulo Zimmermann Matsui - [GitHub](https://github.com/JP-GhOsT) | [Linkedin](https://linkedin.com/in/joaomatsui)
- Gustavo Sena de Souza - [GitHub](https://github.com/gustavosena025-dotcom) | [Linkedin](https://www.linkedin.com/in/gustavo-sena-ads-ia/)
- Robson dos Santos Damasceno Lisboa - [GitHub](https://github.com/RobsonDamsceno) | [Linkedin](https://www.linkedin.com/in/robson-damasceno-b35954356/)
- Caio dos Santos Gregorio da Rocha - [GitHub](https://github.com/caioogregorio) | [Linkedin](https://www.linkedin.com/in/caioogregorio/)
- Diego Mathias da Fonseca - [GitHub](https://github.com/diegomathiasdev) | [Linkedin](https://www.linkedin.com/in/diegomathiasdafonseca/)

---

## ⭐ Observação

Este projeto foi desenvolvido com foco acadêmico, aplicando boas práticas de desenvolvimento full stack e arquitetura moderna de aplicações web.

---

**Project:** Conexxa
**Platform:** Azure DevOps
**Integration:** Azure DevOps MCP + AI Assistant

