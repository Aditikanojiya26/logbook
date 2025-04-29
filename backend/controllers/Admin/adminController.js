const express = require("express");
const LogbookForm = require("../../models/logbookForms");
const Units = require("../../models/unit");
const Roles = require("../../models/designation");

exports.showMasterForm = async (req, res) => {
  const units = await Units.find();
  const roles = await Roles.find();
  return res.render("MasterForm", { units, roles });
};

exports.createMasterForm = async (req, res) => {
  try {
    const form = req.body;
    console.log(JSON.stringify(form, null, 2));

    // Create new logbook form in the database
    const newLogbookForm = new LogbookForm({
      unit: form.unit,
      role: form.role,
      shiftBeg: form.shiftBeg,
      shiftMid: form.shiftMid,
      shiftEnd: form.shiftEnd,
      midnight: form.midnight,
      has_operational_performed_section: form.has_operational_performed_section,
    });

    // Save the new logbook form to the database
    const savedLogbookForm = await newLogbookForm.save();
    console.log("Logbook form saved successfully:", savedLogbookForm);

    // Respond with success message
    res.status(200).json({
      message: "Logbook form submitted successfully!",
      data: savedLogbookForm,
    });
  } catch (error) {
    console.error("Error submitting logbook form:", error);
    res.status(500).json({
      message: "Failed to submit logbook form",
      error: error.message,
    });
  }
};
