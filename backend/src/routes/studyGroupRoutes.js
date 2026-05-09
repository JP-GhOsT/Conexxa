const express = require("express");
const router = express.Router();

const {
  createStudyGroup,
  updateStudyGroup,
  requestJoinGroup
} = require("../controllers/studyGroupController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/study-groups", authMiddleware, createStudyGroup);
router.put("/study-groups/:id", updateStudyGroup);
router.post("/groups/:groupId/join-request", authMiddleware, requestJoinGroup);

module.exports = router;