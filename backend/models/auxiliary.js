const mongoose = require("mongoose");

const auxiliarySchema = new mongoose.Schema({
  name: { type: String,  },

  options: [
    {
      optionName: { type: String,  },
      status: { 
        type: String, 
        enum: ["Ready", "Stopped", "Under Maintenance"], 
         
      }
    }
  ],

  unitId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Unit", 
     
  },

  allowedUsers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Designation",  }
  ],

  shiftTime: [
    { 
      type: String, 
      enum: ["Beginning", "Mid", "End", "Midnight"] 
    }
  ],
  //for feed so use {} to group acc tho section in controller like parameter
  sectionName: { 
    type: String,
},

}, { timestamps: true });



module.exports = mongoose.model("Auxiliary", auxiliarySchema);
