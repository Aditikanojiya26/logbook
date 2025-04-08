const mongoose = require("mongoose");

const auxiliarySchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name of auxiliary (e.g., "Coal Mill", "FO Pump")
    options: [
        {
            optionName: { type: String, required: true },  // e.g., "A", "B", "C"
            status: { type: String, enum: ["Ready", "Stopped", "Under Maintenance"], required: true }
        }
    ],
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    allowedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Designation", required: true }],
    
    
}, { timestamps: true });

module.exports = mongoose.model("Auxiliary", auxiliarySchema);
