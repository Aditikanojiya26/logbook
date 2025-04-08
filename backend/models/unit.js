const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
    name: { type: Number, required: true }
});

module.exports = mongoose.model("Unit", unitSchema);
