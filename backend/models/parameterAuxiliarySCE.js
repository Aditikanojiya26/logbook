const mongoose = require("mongoose");

const auxiliarySchema = new mongoose.Schema(
  {
    name: { type: String },

    options: [
      {
        optionName: { type: String },
        status: {
          type: String,
          enum: ["Ready", "Stopped", "Under Maintenance"],
        },
      },
    ],

    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },

    shiftTime: [
      {
        
        type: String,
        enum: ["Beginning", "Mid", "End", "Midnight"],
      },
    ],

    readings: [
      {
        parameterName: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ParameterAuxiliarySCE", auxiliarySchema);
