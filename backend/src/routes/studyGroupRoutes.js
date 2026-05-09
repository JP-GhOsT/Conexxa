const express = require("express");
const router = express.Router();

const {
  createStudyGroup,
  updateStudyGroup,
  requestJoinGroup
} = require("../controllers/groupController");

const authMiddleware = require("../middlewares/authMiddleware");

// criar grupo
router.post("/study-groups", authMiddleware, createStudyGroup);

// atualizar grupo
router.put("/study-groups/:id", authMiddleware, updateStudyGroup);

// join request
router.post("/:groupId/join-request", authMiddleware, requestJoinGroup);

module.exports = router;