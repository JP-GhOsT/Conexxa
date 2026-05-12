const express = require("express");
const router = express.Router();

const {
  createStudyGroup,
  getStudyGroupById,
  updateStudyGroup,
  getAllStudyGroups,
  requestJoinGroup,
  getJoinRequestStatus,
  acceptJoinRequest,
  rejectJoinRequest,
  getMyAdminGroups,
  getGroupRequests
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

router.patch(
  "/study-groups/:groupId/requests/:userId/accept",
  authMiddleware,
  acceptJoinRequest
);

router.get(
  "/my-admin-groups",
  authMiddleware,
  getMyAdminGroups
);

router.patch(
  "/study-groups/:groupId/requests/:userId/reject",
  authMiddleware,
  rejectJoinRequest
);

router.get(
  "/study-groups/:groupId/requests",
  authMiddleware,
  getGroupRequests
);

module.exports = router;