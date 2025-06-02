// import mongoose from "mongoose";
const LogbookForm = require("../../models/logbookForms");
const LogbookSubmission = require("../../models/SubmitLog");
const Permission = require("../../models/permission");
const Unit = require("../../models/unit");
const LogBookRegister = require("../../models/logBookRegister");
const { createLogEntry, } = require("./logBookRegisterController");

const getFormByRole = async (req, res) => {
  const { role } = req.params;
  try {
    if (!req.user || !req.user.userId) {
      return res
        .status(400)
        .json({ error: "User not authenticated or userId is missing" });
    }
    const form = await LogbookForm.findOne({ role });

    const userId = req.user.userId;
    const permission = await Permission.findOne({ userId });
    const unit = await Unit.findById(permission.unitId);
    const unitName = unit.name;

    if (!form) {
      return res
        .status(404)
        .json({ error: "No form found for the given role" });
    }
    const wantsHTML =
      req.headers.accept && req.headers.accept.includes("text/html");
    const currentDate = new Date();
    const logbookSubmissions = await LogbookSubmission.find({
      $or: [
        {
          createdAt: {
            $gte: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate()
            ),
          },
        },
        {
          updatedAt: {
            $gte: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate()
            ),
          },
        },
      ],
    });

    const prefillData = {};

    logbookSubmissions.forEach((submission) => {
      const shift = submission.shiftPhase;
      if (!prefillData[shift]) prefillData[shift] = {};

      submission.sections.forEach((section) => {
        const sectionName = section.sectionName;
        if (!prefillData[shift][sectionName])
          prefillData[shift][sectionName] = {};

        section.fields.forEach((field) => {
          prefillData[shift][sectionName][field.fieldName] = field.value;
        });
      });
    });
    if (wantsHTML) {
      res.render("logbookForm", { form, permission, unitName, prefillData});
    } else {
      res.json(form);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

//Submit Log
const submitLogbook = async (req, res) => {
  try {
    const { unitId ,userId, role, shiftId, selectedShiftPhase } = req.body;

    if (!userId || !role || !shiftId || !selectedShiftPhase) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Use the helper function to create submission data
    const submissionData = createSubmissionData(req.body);

    // Save the submission
    const submission = new LogbookSubmission(submissionData);
    await submission.save();

    //Create or update entry in register
    const logEntryData = {
      userId: userId,
      unitId: "680caa609e539c519db0c275",
      role: role,
      shiftId: shiftId,
      phase: selectedShiftPhase,
      entryId: submission._id,
    };

    const createdEntry = await createLogEntry(logEntryData);
    res.status(200).json({
      success: true,
      message: "Logbook submitted successfully",
      action: createdEntry,
    });
  } catch (error) {
    console.error("Logbook submission failed:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

//Functions
function createSubmissionData(body) {
  const {
    unitId,
    userId,
    role,
    shiftId,
    operational_details,
    fieldIds,
    sectionIds,
    selectedShiftPhase,
  } = body;

  const allowedPhases = [
    "shiftBeg",
    "shiftMid",
    "shiftEnd",
    "midnight",
    "operational performed",
  ];

  if (!allowedPhases.includes(selectedShiftPhase)) {
    throw new Error("Invalid shift phase selected");
  }

  const sections = [];
  const phaseSections = body[selectedShiftPhase];

  for (const [sectionName, fields] of Object.entries(phaseSections || {})) {
    if (!fields || typeof fields !== "object") continue;

    const sectionId = sectionIds[sections.length] || null;
    const fieldEntries = [];

    for (const [key, value] of Object.entries(fields)) {
      if (key === "section_id" || key.endsWith("_remarks")) continue;

      let fieldId = fieldIds[sections.length] || null;
      let fieldValue = value;

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        fieldId = value.field_id || null;
        fieldValue = value.value !== undefined ? value.value : "";
      }

      fieldEntries.push({ fieldName: key, value: fieldValue, fieldId });

      const remarksKey = `${key}_remarks`;
      if (fields[remarksKey]) {
        fieldEntries.push({
          fieldName: remarksKey,
          value: fields[remarksKey],
          fieldId: null,
        });
      }
    }

    sections.push({ sectionName, sectionId, fields: fieldEntries });
  }

  const submissionData = {
    unitId,
    userId,
    role,
    shiftId,
    shiftPhase: selectedShiftPhase,
    sections,
  };

  if (operational_details) {
    submissionData.operationalDetails = Object.values(operational_details).map(
      (detail) => ({
        time: detail.time,
        description: detail.description,
      })
    );
  }

  return submissionData;
}

module.exports = { getFormByRole, submitLogbook };
