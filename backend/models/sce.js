const mongoose = require("mongoose");

const sceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    shiftId: { type: mongoose.Schema.Types.ObjectId, ref: "Shift", required: true },

    shiftBeginning: {
        parameters: [
            {
                name: { type: String },  // Parameter name
                value: { type: String }  // Value entered by the user
            },
            
        ],
        inServiceAuxiliaries: [
            {
                auxiliaryId: { type: mongoose.Schema.Types.ObjectId, ref: "Auxiliary" }, // Reference to Auxiliary table
                auxiliaryName: { type: String },  // Example: "Coal Mill"
                selectedOptions: [{ type: String }]  // Example: ["A", "B"]
            }
        ],
    },

    midNight: {
        type: {
          parameters: [
            {
              name: { type: String },
              value: { type: String }
            }
          ]
        },
        default: undefined
      },
      shiftEnd: {
        type: {
          parameters: [
            {
              name: { type: String },
              value: { type: String }
            }
          ]
        },
        default: undefined
      }
      ,
    
}, { timestamps: true }); // Automatically adds createdAt & updatedAt

module.exports = mongoose.model("SCE", sceSchema);
