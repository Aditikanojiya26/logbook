const express = require("express");
const router = express.Router();
const Auxiliary = require("../models/auxiliary");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/add-auxiliary", authMiddleware, async (req, res) => {
    try {
        const { name, unitId, options, allowedUsers } = req.body;

        if (!name || !unitId || !options || !Array.isArray(options)) {
            return res.status(400).json({ msg: "Missing required fields or invalid options format" });
        }

        const auxiliary = new Auxiliary({ name, unitId, options, allowedUsers });
        await auxiliary.save();

        res.status(200).json({ msg: "Auxiliary added successfully", data: auxiliary });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

router.put("/update-auxiliary-status", authMiddleware, async (req, res) => {
    try {
        const { auxiliaryId, unitId, optionName, newStatus } = req.body;

        if (!auxiliaryId || !unitId || !optionName || !newStatus) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        const auxiliary = await Auxiliary.findOne({ _id: auxiliaryId, unitId });
        if (!auxiliary) {
            return res.status(404).json({ msg: "Auxiliary not found or unit mismatch" });
        }

        const option = auxiliary.options.find(opt => opt.optionName === optionName);
        if (!option) {
            return res.status(404).json({ msg: "Option not found" });
        }

        option.status = newStatus;
        await auxiliary.save();

        res.status(200).json({ msg: "Auxiliary status updated successfully", data: auxiliary });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});


router.get("/fetch-auxiliaries", authMiddleware, async (req, res) => {
    try {
        const auxiliaries = await Auxiliary.find();
        res.status(200).json({ msg: "Auxiliaries fetched successfully", data: auxiliaries });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
