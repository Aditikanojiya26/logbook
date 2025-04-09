const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    addAuxiliary,
    updateAuxiliaryStatus,getAuxiliary
} = require("../controllers/auxiliaryController");

router.post("/add-auxiliary", authMiddleware, addAuxiliary);
router.put("/update-auxiliary-status", authMiddleware, updateAuxiliaryStatus);


router.get("/fetch-auxiliaries", authMiddleware,auxiliaryController.getAuxiliary);

module.exports = router;
