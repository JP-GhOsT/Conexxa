const express = require("express");

const autenticarToken =
    require("../middlewares/autenticarToken");

const {
    criarGrupo
} = require(
    "../controllers/gruposController"
);

const router = express.Router();

router.post(
    "/grupos",
    autenticarToken,
    criarGrupo
);

module.exports = router;