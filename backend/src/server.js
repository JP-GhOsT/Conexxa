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
   ROUTES
========================= */

const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/studyGroupRoutes");

app.use("/auth", authRoutes);
app.use("/", groupRoutes);

/* =========================
   SERVER
========================= */

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});