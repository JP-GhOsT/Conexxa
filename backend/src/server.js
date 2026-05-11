const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const studyGroupRoutes = require("./routes/studyGroupRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");

app.use("/auth", authRoutes);
app.use("/groups", studyGroupRoutes);
app.use("/api/usuarios", usuariosRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
