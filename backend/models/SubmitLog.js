const mongoose = require("mongoose");

const logbookSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    role: {
      type: String,
    },

    shiftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shifts",
    },
    shiftPhase: {
      type: String,
      enum: [
        "shiftBeg",
        "shiftMid",
        "shiftEnd",
        "midnight",
        "operational performed",
      ],
    },
    sections: [
      {
        sectionName: {
          type: String,
        },
        sectionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "LogbookForm",
        },
        fields: [
          {
            fieldName: { type: String, required: true },
            value: {
              type: mongoose.Schema.Types.Mixed,
            },
            fieldId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "LogbookForm",
            },
          },
        ],
      },
    ],
    operationalDetails: [
      {
        time: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("LogbookSubmission", logbookSubmissionSchema);
