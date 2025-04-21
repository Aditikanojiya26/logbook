const express = require("express");
const router = express.Router();
const { submitSection, getShiftData, setSectionTimeLimit } = require("../controllers/shiftController");

router.post("/submit-section", submitSection);
router.get("/:shiftId", getShiftData);
router.post("/set-time-limit", setSectionTimeLimit);

module.exports = router;
