const express = require("express");
const router = express.Router();

const groupController = require("../controllers/groupController");
const authMiddleware = require("../middlewares/authMiddleware");
const { createStudyGroup, updateStudyGroup, getStudyGroupById } = require("../controllers/studyGroupController");

// Criar grupo
router.post("/study-groups", createStudyGroup);

// Atualizar grupo
router.put("/study-groups/:id", updateStudyGroup);

// Buscar grupo por ID
router.get("/study-groups/:id", getStudyGroupById);

// Join request
router.post(
  "/:groupId/join-request",
  authMiddleware,
  groupController.requestJoinGroup
);

module.exports = router;
