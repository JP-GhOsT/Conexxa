const express = require("express");

const router = express.Router();

const {

  createStudyGroup,

  getStudyGroupById,

  updateStudyGroup,

  requestJoinGroup

} = require("../controllers/studyGroupController");

const authMiddleware =
  require("../middlewares/authMiddleware");

/* =========================
   GROUPS
========================= */

// CRIAR GRUPO
router.post(

  "/study-groups",

  authMiddleware,

  createStudyGroup

);

// BUSCAR GRUPO POR ID
router.get(

  "/study-groups/:id",

  authMiddleware,

  getStudyGroupById

);

// ATUALIZAR GRUPO
router.put(

  "/study-groups/:id",

  authMiddleware,

  updateStudyGroup

);

/* =========================
   JOIN REQUEST
========================= */

router.post(

  "/study-groups/:groupId/join-request",

  authMiddleware,

  requestJoinGroup

);

module.exports = router;