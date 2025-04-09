const Auxiliary = require("../models/auxiliary");
const Parameter = require("../models/SCE_Parameter");
const Permission = require("../models/permission"); 
exports.getSCEData = async (req, res) => {
    try {
    const userId = req.user.userId; 
    const permission = await Permission.findOne({ userId });

    if (!permission) {
      return res.status(403).json({ msg: "Access denied: No permission for this user." });
    }
      const auxiliaries = await Auxiliary.find();
      const parameters = await Parameter.find();
  
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

    if (isBrowser) {
      return res.render("sceForm.ejs", { auxiliaries, parameters: groupedParams });
    } else {
      return res.json({ auxiliaries, parameters: groupedParams });
    }
    } catch (error) {
      console.error("Error fetching SCE data:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  