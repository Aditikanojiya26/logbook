const User = require("../models/user");
const Permission = require("../models/permission");
const Shift = require("../models/shift");
const Unit = require("../models/unit");
const Parameter=require("../models/SCE_Parameter")
exports.getAssignPermission = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== "PDE") {
      return res.status(403).send("Access denied. Only PDEs can assign permissions.");
    }

    const shifts = await Shift.find();
    const units = await Unit.find();
    const users = await User.find({ role: { $ne: "PDE" } });

    res.render("assignPermission.ejs", { users, shifts, units });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.assignPermission = async (req, res) => {
  const { userId, shiftId, unitId } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== "PDE") {
      return res.status(403).json({ msg: "Access denied. Only PDEs can assign permissions." });
    }

    const selectedUser = await User.findById(userId);
    const shift = await Shift.findById(shiftId);
    const unit = await Unit.findById(unitId);

    if (!selectedUser || !shift || !unit) {
      return res.status(404).json({ msg: "Invalid user, shift, or unit" });
    }

    const newPermission = new Permission({ userId, shiftId, unitId });
    await newPermission.save();

    res.redirect("/assign-permission");
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getParameters = async (req, res) => {
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
exports.getForm=async (req, res) => {
  const response = await fetch('http://localhost:5000/api/parameters');
  const data = await response.json();
  
  res.render('form', { allParameters: data });
}