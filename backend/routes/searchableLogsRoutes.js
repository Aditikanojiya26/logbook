const express = require("express");
const {
  getSearchableLog,
  searchableLogTable,
  viewLogEntry,
} = require("../controllers/Forms/searchableLogController");
const router = express.Router();

router.get("/searchableLogs", getSearchableLog);
router.get("/SearchableLogTable", searchableLogTable);
router.get("/viewLogEntry/:id", viewLogEntry);
module.exports = router;
