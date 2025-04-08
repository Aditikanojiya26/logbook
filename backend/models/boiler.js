const mongoose = require("mongoose");

const boilerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    shiftId: { type: mongoose.Schema.Types.ObjectId, ref: "Shift", required: true },
    timestamp: { type: Date, default: Date.now },

    shiftBeginning: {
      inServiceAuxiliaries: [
        {
          auxiliaryId: { type: mongoose.Schema.Types.ObjectId, ref: "Auxiliary" },
          name: { type: String }, // Auxiliary Name (e.g., "LDO Pump")
          optionName: { type: String, required: true } // ✅ Add this field for A/B selection
        }
      ]
    },

    shiftMid: {},

    shiftEnd: {}
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

module.exports = mongoose.model("Boiler", boilerSchema);
