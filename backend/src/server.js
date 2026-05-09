const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./models/userModel");
require("./models/groupModel");
require("./models/groupMembershipModel");

const authRoutes = require("./routes/authRoutes");
const studyGroupRoutes = require("./routes/studyGroupRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ROTAS
app.use("/auth", authRoutes);
app.use("/groups", studyGroupRoutes);
app.use("/api/usuarios", usuariosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});