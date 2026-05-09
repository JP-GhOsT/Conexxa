const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/studyGroupRoutes");

app.use("/auth", authRoutes);
app.use("/", groupRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});