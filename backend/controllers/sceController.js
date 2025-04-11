const Auxiliary = require("../models/auxiliary");
const Parameter = require("../models/SCE_Parameter");
const Permission = require("../models/permission"); 
const ParameterAuxiliarySCE = require("../models/parameterAuxiliarySCE");

exports.getSCEData = async (req, res) => {
    try {
    const userId = req.user.userId; 
    const permission = await Permission.findOne({ userId });

    if (!permission) {
      return res.status(403).json({ msg: "Access denied: No permission for this user." });
    }
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
  
        if (!groupedParams[shift]) {
          groupedParams[shift] = {};
        }
  
        if (!groupedParams[shift][section]) {
          groupedParams[shift][section] = [];
        }
  
        groupedParams[shift][section].push({
          name: param.name,
          inputType: param.inputType,
          unit: param.unit,
          options: param.options
        });
      });
  
      const isBrowser = req.headers.accept && req.headers.accept.includes("text/html");
      
      console.log(groupedParameterAux)
    if (isBrowser) {
      return res.render("sceForm.ejs", { auxiliaries: groupedAuxiliaries, parameters: groupedParams,parameterAuxiliaries: groupedParameterAux });
    } else {
      return res.json({ auxiliaries: groupedAuxiliaries, parameters: groupedParams,parameterAuxiliaries: groupedParameterAux });
    }
    } catch (error) {
      console.error("Error fetching SCE data:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  