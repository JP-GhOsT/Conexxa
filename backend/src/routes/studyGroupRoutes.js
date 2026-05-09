const express = require("express");

const router = express.Router();

const {
  createStudyGroup
} = require(
  "../controllers/studyGroupController"
);

router.post(
  "/study-groups",
  createStudyGroup
);

module.exports = router;