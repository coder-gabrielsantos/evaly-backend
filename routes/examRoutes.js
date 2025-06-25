const express = require("express");
const router = express.Router();
const { createExam, getMyExams } = require("../controllers/examController");
const requireAuth = require("../middleware/authMiddleware");

router.post("/", requireAuth, createExam);
router.get("/", requireAuth, getMyExams);

module.exports = router;
