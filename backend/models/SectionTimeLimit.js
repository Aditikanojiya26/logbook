const mongoose = require("mongoose");

const SectionTimeLimitSchema = new mongoose.Schema({
    section: { type: String, required: true },
    relativeStartMinutes: { type: Number, required: true },
    relativeEndMinutes: { type: Number, required: true },
});

module.exports = mongoose.model("SectionTimeLimit", SectionTimeLimitSchema);
