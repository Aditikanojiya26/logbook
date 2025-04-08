const mongoose = require("mongoose");

const sce_parameterSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Parameter name
    inputType: { type: String, enum: ["number", "text", "select","date","time","checkbox"], required: true }, // Type of input field
    shiftTime: { 
        type: String, 
        enum: ["Beginning", "Mid", "End", "Midnight"], 
        required: true 
    }, // Shift timing
    sectionName: { 
        type: String, 
        enum: ["Operational Details","Important Parameters","Shift End Parameters","other",], 
        required: true 
    },
    unit: { type: String }, // Measurement unit (optional)
    options: [{ type: String }] // Only needed for dropdown fields (select type)
});

module.exports = mongoose.model("SCE_Parameter", sce_parameterSchema);