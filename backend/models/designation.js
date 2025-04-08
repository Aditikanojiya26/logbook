const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['SCE', 'PDE', 'FEED', 'BOILER', 'ATRS', 'BOP'],
    unique: true
  }
});

const Designation = mongoose.model('Designation', designationSchema);

module.exports = Designation;
