const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: String, required: true }
});

module.exports = mongoose.model("Shift", shiftSchema);
