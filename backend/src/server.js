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

// AUTH
app.use("/auth", authRoutes);

// GROUPS
app.use("/groups", studyGroupRoutes);

/* =========================
   SERVER
========================= */

app.listen(3000, () => {

  console.log(
    "Servidor rodando na porta 3000"
  );

});