const LogbookForm = require("../../models/logbookForms");
const LogbookSubmission = require('../../models/SubmitLog');
const Permission = require("../../models/permission");
const Unit = require("../../models/unit");
const getFormByRole = async (req, res) => {
  const { role } = req.params;

  try {
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ error: 'User not authenticated or userId is missing' });
    }
    const form = await LogbookForm.findOne({ role });


    const userId = req.user.userId;
    const permission = await Permission.findOne({ userId });
    const unit = await Unit.findById(permission.unitId);
    const unitName = unit.name;

    if (!form) {
      return res.status(404).json({ error: "No form found for the given role" });
    }
    const wantsHTML = req.headers.accept && req.headers.accept.includes("text/html");
    const currentDate = new Date();
    const logbookSubmissions = await LogbookSubmission.find({
      $or: [
        { createdAt: { $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) } },
        { updatedAt: { $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) } }
      ]
    });

    const prefillData = {};

    logbookSubmissions.forEach((submission) => {
      const shift = submission.shiftPhase;
      if (!prefillData[shift]) prefillData[shift] = {};

      submission.sections.forEach((section) => {
        const sectionName = section.sectionName;
        if (!prefillData[shift][sectionName]) prefillData[shift][sectionName] = {};

        section.fields.forEach((field) => {
          prefillData[shift][sectionName][field.fieldName] = field.value;
        });
      });
    });
    if (wantsHTML) {

      res.render("logbookForm", { form, permission, unitName, prefillData });
    } else {
      res.json(form);
    }

  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};


const submitLogbook = async (req, res) => {
  try {
    const {
      userId,
      role,
      shiftId,
      operational_details,
      fieldIds,
      sectionIds,
      selectedShiftPhase,
    } = req.body;

    // Check if required data exists
    if (!userId || !role || !shiftId || !selectedShiftPhase) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const allowedPhases = ['shiftBeg', 'shiftMid', 'shiftEnd', 'midnight', 'operational performed'];

    // Validate that the selected phase is correct
    if (!allowedPhases.includes(selectedShiftPhase)) {
      return res.status(400).json({ success: false, message: 'Invalid shift phase selected' });
    }

    // Initialize sections array
    const sections = [];

    // Get the sections for the selected shift phase from the request body
    const phaseSections = req.body[selectedShiftPhase]; // Dynamically get the selected shift phase

    // Process the fields for the selected shift phase
    for (const [sectionName, fields] of Object.entries(phaseSections || {})) {
      if (!fields || typeof fields !== 'object') continue;

      const sectionId = sectionIds[sections.length] || null;
      const fieldEntries = [];

      // Process each field in the section
      for (const [key, value] of Object.entries(fields)) {
        if (key === 'section_id' || key.endsWith('_remarks')) continue;

        let fieldId = fieldIds[sections.length] || null;
        let fieldValue = value;

        // Check for object value structure and extract field ID and value
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          fieldId = value.field_id || null;
          fieldValue = value.value !== undefined ? value.value : '';
        }

        fieldEntries.push({ fieldName: key, value: fieldValue, fieldId });

        // Check for remarks field
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

    // Construct the data to submit
    const submissionData = {
      userId,
      role,
      shiftId,
      shiftPhase: selectedShiftPhase, // Store selected shift phase
      sections,
    };

    if (operational_details) {
      submissionData.operationalDetails = Object.values(operational_details).map((detail) => ({
        time: detail.time,
        description: detail.description,
      }));
    }

    // Create and save the logbook submission
    const submission = new LogbookSubmission(submissionData);
    await submission.save();


    res.status(200).json({ success: true, message: 'Logbook submitted successfully' });
  } catch (error) {
    console.error('Logbook submission failed:', error);
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};


module.exports = { getFormByRole, submitLogbook };
