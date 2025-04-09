const express = require("express");
const router = express.Router();
const { getSCEData } = require("../controllers/sceController");
const { jwtAuthMiddleware} = require("../middleware/authMiddleware");

router.get("/SCEForm", jwtAuthMiddleware, getSCEData);

module.exports = router;
