const express = require("express");
const router = express.Router();

const {
  createStudyGroup,
  getStudyGroupById,
  updateStudyGroup,
  getAllStudyGroups,
  requestJoinGroup,
  getJoinRequestStatus
} = require("../controllers/studyGroupController");

const authMiddleware = require("../middlewares/authMiddleware");

/* =========================
   GROUPS
========================= */

router.post("/study-groups", authMiddleware, createStudyGroup);

router.get("/study-groups", authMiddleware, getAllStudyGroups);

router.get("/study-groups/:id", authMiddleware, getStudyGroupById);

router.put("/study-groups/:id", authMiddleware, updateStudyGroup);

/* =========================
   JOIN SYSTEM
========================= */

router.post(
  "/study-groups/:groupId/join-request",
  authMiddleware,
  requestJoinGroup
);

router.get(
  "/study-groups/:groupId/join-request-status",
  authMiddleware,
  getJoinRequestStatus
);

module.exports = router;