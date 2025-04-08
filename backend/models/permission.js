const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shiftId: { type: mongoose.Schema.Types.ObjectId, ref: "Shift", required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Permission", permissionSchema);
