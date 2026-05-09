const express = require("express");
const router = express.Router();
const { cadastrarUsuario } = require("../controllers/usuariosController");

router.post("/cadastro", cadastrarUsuario);

module.exports = router;
