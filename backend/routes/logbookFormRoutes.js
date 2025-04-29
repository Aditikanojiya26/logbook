const express = require("express");
const router = express.Router();
const { getFormByRole } = require("../controllers/Forms/logbookFormController.js");

router.get("/logbookform/:role", getFormByRole);

module.exports = router;
