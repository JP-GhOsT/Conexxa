const express = require("express");
const router = express.Router();

const {
  createStudyGroup,
  updateStudyGroup,
  requestJoinGroup
} = require("../controllers/studyGroupController");

const authMiddleware = require("../middlewares/authMiddleware");

/* =========================
   GROUPS
========================= */

// Criar grupo (protegido)
router.post("/study-groups", authMiddleware, createStudyGroup);

// Atualizar grupo (PROVAVELMENTE deve ser protegido também)
router.put("/study-groups/:id", authMiddleware, updateStudyGroup);

/* =========================
   JOIN REQUEST
========================= */

router.post(
  "/study-groups/:groupId/join-request",
  authMiddleware,
  requestJoinGroup
);

module.exports = router;