const express = require("express");
const router = express.Router();

const groupController = require("../controllers/groupController");
const authMiddleware = require("../middlewares/authMiddleware");

// Criar grupo
router.post("/study-groups", groupController.createStudyGroup);

// Join request
router.post(
  "/:groupId/join-request",
  authMiddleware,
  groupController.requestJoinGroup
);

module.exports = router;