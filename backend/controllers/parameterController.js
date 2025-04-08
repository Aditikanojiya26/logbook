const Parameter = require("../models/Parameter");

const getParameterById = async (req, res) => {
    try {
      const { id } = req.params; 
  
      const parameter = await Parameter.findById(id);
  
      if (!parameter) {
        return res.status(404).json({ error: "Parameter not found" });
      }
  
      console.log("Fetched Parameter:", parameter);
      res.json(parameter);
    } catch (err) {
      console.error("Error Fetching Parameter:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  
const getParameters = async (req, res) => {
  try {
    const parameters = await Parameter.find({});
    if (!parameters) return res.status(404).json({ error: "No parameters found" });
    const groupedParams = {
      Beginning: [],
      Middle: [],
      End: []
    };

    parameters.forEach(param => {
      if (!groupedParams[param.shiftTime]) {
        groupedParams[param.shiftTime] = [];
      }
      groupedParams[param.shiftTime].push({
        name: param.name,
        inputType: param.inputType,
        unit: param.unit,
        options: param.options
      });
    });
    
    res.json(groupedParams);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addParameter = async (req, res) => {
    try {
        console.log("Received Data:", req.body); 

        const newParameter = new Parameter(req.body);
        await newParameter.save();
        console.log("Parameter Added:", newParameter); 

        res.status(201).json(newParameter);
    } catch (error) {
        console.error("Error Adding Parameter:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

  
const updateParameter = async (req, res) => {
    try {
      const { id } = req.params; 
      const updatedData = req.body;
  
      const updatedParameter = await Parameter.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedParameter) {
        return res.status(404).json({ error: "Parameter not found" });
      }
  
      console.log("Updated Parameter:", updatedParameter);
      res.json(updatedParameter);
    } catch (err) {
      console.error("Error Updating Parameter:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

const deleteParameter = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedParam = await Parameter.findByIdAndDelete(id);
        if (!deletedParam) return res.status(404).json({ error: "Parameter Not Found" });

        res.json({ message: "Parameter deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting parameter" });
    }
};

module.exports = {getParameterById, getParameters, addParameter, updateParameter, deleteParameter };