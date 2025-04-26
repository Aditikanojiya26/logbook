const express = require("express");
const LogbookForm = require("../../models/logbookForms");

exports.showMasterForm = async (req, res) => {
  return res.render("MasterForm");
};

exports.createMasterForm = async (req, res) => {
//   const { unit, role, shiftBeg, shiftMid, shiftEnd, midnight } = req.body;
//   console.log(req.body);
//   try {
//     const newForm = new LogbookForm({
//       unit,
//       role,
//       sections: {
//         shiftBeg,
//         shiftMid,
//         shiftEnd,
//         midnight,
//       },
//     });
//     console.log(newForm);
//     await newForm.save();
//     return res.status(201).json({ message: "Form created successfully!" });
//   } catch (error) {
//     console.error("Error creating master form:", error);
//     return res.status(500).send("Error creating master form");
//   }
};
