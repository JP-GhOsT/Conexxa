# Conexxa — Plataforma de Grupos de Estudo

- 🇺🇸 English version: [English README](./README.md)

---
Sistema full stack para criação e gerenciamento de grupos de estudo, com autenticação, solicitações de entrada e painel administrativo.

---

## 📌 Visão Geral

O Conexxa permite que estudantes criem e participem de grupos de estudo de forma organizada.

Funcionalidades principais:
- Cadastro e login de usuários (JWT)
- Criação de grupos de estudo
- Listagem de grupos
- Solicitação de entrada em grupos
- Aprovação ou rejeição de membros pelo admin
- Painel de administração de grupos
- Edição de grupos

---

## 🧠 Tecnologias

### Frontend
- React.js
- React Router DOM
- Axios
- React Toastify

### Backend
- Node.js
- Express
- SQLite
- JWT
- UUID

---

## 📡 API

### Auth
- POST /auth/register
- POST /auth/login

### Groups
- POST /groups/study-groups
- GET /groups/study-groups
- GET /groups/study-groups/:id
- PUT /groups/study-groups/:id

### Requests
- POST /groups/study-groups/:groupId/join-request
- GET /groups/study-groups/:groupId/join-request-status
- GET /groups/study-groups/:groupId/requests

### Admin
- GET /groups/my-admin-groups
- PATCH /groups/study-groups/:groupId/requests/:userId/accept
- PATCH /groups/study-groups/:groupId/requests/:userId/reject

---

## 🧩 Funcionalidades

### Usuário
- Criar conta
- Login
- Visualizar grupos
- Solicitar entrada em grupos
- Ver status da solicitação

### Admin
- Criar grupos
- Editar grupos
- Ver solicitações
- Aceitar membros
- Rejeitar membros

---

## 🗄️ Banco de Dados

### users
- id
- nome_completo
- email
- senha_hash

### groups
- id
- subject
- objective
- location_type
- participant_limit
- creator_id

### group_memberships
- id
- group_id
- user_id
- status
- created_at
- updated_at

---

## 🔐 Segurança
- JWT Authentication
- Middleware de proteção
- Controle de acesso por role

---

## 🚀 Como rodar

### Backend
```bash
cd backend
npm install
node src/server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 👨‍💻 Equipe

- João Paulo Zimmermann Matsui
- Gustavo Sena de Souza
- Robson Damasceno
- Caio Gregório
- Diego Mathias
