const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/usuariosController");

router.post("/usuarios/cadastro", registerUser);

module.exports = router;
