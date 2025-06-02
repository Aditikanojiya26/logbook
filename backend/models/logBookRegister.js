const mongoose = require("mongoose");
const logBookRegisterSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit",
  },
  role: {
    type: String,
  },
  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
  },
  shiftPhase: {
    shiftBeg: {
      type: Boolean,
      default: false,
    },
    shiftMid: {
      type: Boolean,
      default: false,
    },
    shiftEnd: {
      type: Boolean,
      default: false,
    },
    shiftMidNight: {
      type: Boolean,
      default: false,
    },
    operationalDetails: {
      type: Boolean,
      default: false,
    },
  },
  logEntryId: {
    shiftBeg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LogbookSubmission",
    },
    shiftMid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LogbookSubmission",
    },
    shiftEnd: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LogbookSubmission",
    },
    shiftMidNight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LogbookSubmission",
    },
    operationalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LogbookSubmission",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LogBookRegister = mongoose.model(
  "LogBookRegister",
  logBookRegisterSchema
);

module.exports = LogBookRegister;
