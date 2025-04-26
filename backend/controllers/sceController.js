const Auxiliary = require("../models/auxiliary");
const Parameter = require("../models/SCE_Parameter");
const Permission = require("../models/permission");
const ParameterAuxiliarySCE = require("../models/parameterAuxiliarySCE");
const Sce = require("../models/sce");
const SectionTimeLimit = require("../models/SectionTimeLimit");
const Shift = require("../models/shift");
const express = require("express");
const app = express();

// Body parser middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



exports.getSCEData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const permission = await Permission.findOne({ userId });
    
    
    if (!permission) {
      return res.status(403).json({ msg: "Access denied: No permission for this user." });
    }
    const existingData = await Sce.findOne({
      userId,
      shiftId: permission.shiftId,
      unitId: permission.unitId
    });
    const parameterAuxiliaries = await ParameterAuxiliarySCE.find();
    const groupedParameterAux = {
      Beginning: [],
      End: [],
      Middle: [],

    };

    parameterAuxiliaries.forEach((aux) => {
      aux.shiftTime.forEach((shift) => {
        if (!groupedParameterAux[shift]) {
          groupedParameterAux[shift] = [];
        }
        groupedParameterAux[shift].push({
          name: aux.name,
          options: aux.options,
          reading: aux.readings,
          unitId: aux.unitId,
        });
      });
    });
    const auxiliaries = await Auxiliary.find();
    const parameters = await Parameter.find();

    const groupedAuxiliaries = {
      Beginning: [],
      Middle: [],
      End: [],
      Midnight: []
    };

    auxiliaries.forEach(aux => {
      aux.shiftTime.forEach(shift => {
        if (!groupedAuxiliaries[shift]) {
          groupedAuxiliaries[shift] = [];
        }
        groupedAuxiliaries[shift].push(aux);
      });
    });



    const groupedParams = {
      Beginning: {},
      Middle: {},
      End: {},
      Midnight: {}
    };

    parameters.forEach(param => {
      const shift = param.shiftTime;
      const section = param.sectionName;

      if (!groupedParams[shift][section]) {
        groupedParams[shift][section] = new Map();
      }

      // Use param name as key to prevent duplicates
      groupedParams[shift][section].set(param.name, {
        name: param.name,
        inputType: param.inputType,
        unit: param.unit,
        options: param.options
      });
    });

    // Convert Maps back to arrays
    for (const shift in groupedParams) {
      for (const section in groupedParams[shift]) {
        groupedParams[shift][section] = Array.from(groupedParams[shift][section].values());
      }
    }

    

    const isBrowser = req.headers.accept && req.headers.accept.includes("text/html");

    if (isBrowser) {
      return res.render("sceForm.ejs", { auxiliaries: groupedAuxiliaries, parameters: groupedParams, parameterAuxiliaries: groupedParameterAux,permission});
    } else {
      return res.json({ auxiliaries: groupedAuxiliaries, parameters: groupedParams, parameterAuxiliaries: groupedParameterAux, SCE: SCE,completedSections });
    }
  } catch (error) {
    console.error("Error fetching SCE data:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


