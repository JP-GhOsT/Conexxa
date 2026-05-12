const express = require("express");

const cors = require("cors");

const app = express();

/* =========================
   MIDDLEWARES
========================= */

// CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://SEU-FRONTEND.onrender.com"
  ]
}));

// JSON
app.use(express.json());

/* =========================
   MODELS
========================= */

// Inicializar tabelas
require("./models/userModel");

require("./models/groupModel");

require("./models/groupMembershipModel");

/* =========================
   ROUTES
========================= */

const authRoutes =
  require("./routes/authRoutes");

const studyGroupRoutes =
  require("./routes/studyGroupRoutes");

// AUTH
app.use("/auth", authRoutes);

// GROUPS
app.use("/groups", studyGroupRoutes);

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});