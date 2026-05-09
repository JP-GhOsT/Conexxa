const express = require("express");

const authMiddleware =
    require("../middlewares/authMiddleware");

const {
    criarGrupo
} = require(
    "../controllers/gruposController"
);

const router = express.Router();

router.post(
    "/grupos",
    authMiddleware,
    criarGrupo
);

module.exports = router;