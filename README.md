# Conexxa — Study Group Platform

🇧🇷 Para a versão em português, veja [README.pt-BR.md](README.pt-BR.md)

Full-stack system for creating and managing study groups with authentication, join requests, and admin moderation.

---

## 📌 Overview

Conexxa allows students to create and join study groups in an organized way.

Main features:
- User registration and login (JWT)
- Study group creation
- Group listing
- Join request system
- Admin approval/rejection
- Admin dashboard
- Group editing

---

## 🧠 Tech Stack

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

## 🧩 Features

### User
- Create account
- Login
- Browse groups
- Request to join groups
- View request status

### Admin
- Create groups
- Edit groups
- View requests
- Accept members
- Reject members

---

## 🗄️ Database

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

## 🔐 Security
- JWT Authentication
- Protected routes middleware
- Role-based access control

---

## 🚀 Run project

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


## Contributors

- João Paulo Zimmermann Matsui - [GitHub](https://github.com/JP-GhOsT) | [Linkedin](https://linkedin.com/in/joaomatsui)
- Gustavo Sena de Souza - [GitHub](https://github.com/gustavosena025-dotcom) | [Linkedin](https://www.linkedin.com/in/gustavo-sena-ads-ia/)
- Robson dos Santos Damasceno Lisboa - [GitHub](https://github.com/RobsonDamsceno) | [Linkedin](https://www.linkedin.com/in/robson-damasceno-b35954356/)
- Caio dos Santos Gregorio da Rocha - [GitHub](https://github.com/caioogregorio) | [Linkedin](https://www.linkedin.com/in/caioogregorio/)
- Diego Mathias da Fonseca - [GitHub](https://github.com/diegomathiasdev) | [Linkedin](https://www.linkedin.com/in/diegomathiasdafonseca/)

---

**Project:** Conexxa
**Platform:** Azure DevOps
**Integration:** Azure DevOps MCP + AI Assistant
