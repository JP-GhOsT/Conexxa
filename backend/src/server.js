const express = require("express");

const cors = require("cors");

const app = express();

/* =========================
   MIDDLEWARES
========================= */

// CORS
app.use(cors());

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

const usuariosRoutes =
  require("./routes/usuariosRoutes");

app.use("/auth", authRoutes);

app.use("/groups", studyGroupRoutes);

app.use("/api/usuarios", usuariosRoutes);

/* =========================
   SERVER
========================= */

app.listen(3000, () => {

  console.log(
    "Servidor rodando na porta 3000"
  );

});