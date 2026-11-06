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

## 🌐 Live Demo

The project is deployed on **Render**. A complementary repository is also available, containing visual documentation and GIF demonstrations of the main features.

- **Frontend:** [https://conexxa-1.onrender.com/](https://conexxa-1.onrender.com/)
- **Backend:** [https://conexxa-eemn.onrender.com/](https://conexxa-eemn.onrender.com/)
- **Documentation and demonstrations:** [Conexxa Docs](https://github.com/JP-GhOsT/Conexxa-Docs) — project documentation featuring GIFs showcasing its main functionalities.

---

## 👨‍💻 Contributors

- João Paulo Zimmermann Matsui - [GitHub](https://github.com/JP-GhOsT) | [LinkedIn](https://linkedin.com/in/joaomatsui)
- Gustavo Sena de Souza - [GitHub](https://github.com/gustavosena025-dotcom) | [LinkedIn](https://www.linkedin.com/in/gustavo-sena-ads-ia/)
- Robson dos Santos Damasceno Lisboa - [GitHub](https://github.com/RobsonDamsceno) | [LinkedIn](https://www.linkedin.com/in/robson-damasceno-b35954356/)
- Caio dos Santos Gregorio da Rocha - [GitHub](https://github.com/caioogregorio) | [LinkedIn](https://www.linkedin.com/in/caioogregorio/)
- Diego Mathias da Fonseca - [GitHub](https://github.com/diegomathiasdev) | [LinkedIn](https://www.linkedin.com/in/diegomathiasdafonseca/)

---

## 📌 Project Info

- **Project:** Conexxa
- **Type:** Full-stack academic project
- **Stack:** React + Node.js + SQLite
- **Architecture:** REST API + JWT Authentication
- **Hosting:** Render
- **Integration:** Azure DevOps MCP + AI Assistant

---

## ⭐ Final Note

This project demonstrates practical full-stack development skills, including authentication, REST API design, database modeling, and frontend-backend integration.

---

**Project:** Conexxa  
**Platform:** Azure DevOps  
**Hosting:** Render  
**Integration:** Azure DevOps MCP + AI Assistant
