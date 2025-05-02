const express = require("express");
const router = express.Router();
const { getFormByRole,submitLogbook } = require("../controllers/Forms/logbookFormController.js");
const { jwtAuthMiddleware } = require("../middleware/authMiddleware");
router.get("/logbookform/:role",jwtAuthMiddleware, getFormByRole);
router.post("/submit",submitLogbook)
module.exports = router;
