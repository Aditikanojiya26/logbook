const User = require("../models/user");
const Permission = require("../models/permission");
const Shift = require("../models/shift");
const Unit = require("../models/unit");
const Parameter=require("../models/SCE_Parameter")
exports.getAssignPermission = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    console.log(user.role);
    
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
  let { userId, shiftId, unitId } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== "PDE") {
      return res.status(403).json({ msg: "Access denied. Only PDEs can assign permissions." });
    }

    userId = Array.isArray(userId) ? userId : [userId];

    const shift = await Shift.findById(shiftId);
    const unit = await Unit.findById(unitId);
    if (!shift || !unit) {
      return res.status(404).json({ msg: "Invalid shift or unit" });
    }

    for (const id of userId) {
      const selectedUser = await User.findById(id);
      if (!selectedUser) continue;

      const existing = await Permission.findOne({ userId: id, shiftId, unitId });
      if (!existing) {
        const newPermission = new Permission({ userId: id, shiftId, unitId });
        await newPermission.save();
      }
    }

    res.redirect("/assign-permission");
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


