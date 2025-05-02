const LogbookForm = require("../../models/logbookForms");
const LogbookSubmission = require('../../models/SubmitLog');
const Permission = require("../../models/permission");
const getFormByRole = async (req, res) => {
  const { role } = req.params;

  try {
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ error: 'User not authenticated or userId is missing' });
    }
    const form = await LogbookForm.findOne({ role });
    const userId = req.user.userId;
    const permission = await Permission.findOne({ userId });
   
    if (!form) {
      return res.status(404).json({ error: "No form found for the given role" });
    }

   
    const wantsHTML = req.headers.accept && req.headers.accept.includes("text/html");

    if (wantsHTML) {
      
      res.render("logbookForm", { form,permission }); 
    } else {
      res.json(form);
    }

  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};


const submitLogbook = async (req, res) => {
  try {
    const { userId, role, shiftId, is_operational_only, operational_details, fieldIds, sectionIds } = req.body;
    
    const shiftPhases = ['shiftBeg', 'shiftMid', 'shiftEnd', 'midnight'];
    const sections = [];
    let detectedShiftPhase = null;
    
    for (const phase of shiftPhases) {
      if (req.body[phase]) {
        detectedShiftPhase = phase;
        const phaseSections = req.body[phase];  // <- Define it here
        
        for (const [sectionName, fields] of Object.entries(phaseSections)) {
          if (!fields || typeof fields !== 'object') continue;

          const fieldEntries = [];

          // Iterate over fields and match fieldIds from the request
          const sectionId = sectionIds[sections.length]; // Fetch the corresponding sectionId

          for (const [key, value] of Object.entries(fields)) {
            if (key === 'section_id') continue;
            if (key.endsWith('_remarks')) continue;

            let fieldId = fieldIds[sections.length] || null;  // Match fieldId from the request body
            let fieldValue = value;

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
              fieldId = value.field_id || null;
              fieldValue = value.value !== undefined ? value.value : '';
            }

            fieldEntries.push({
              fieldName: key,
              value: fieldValue,
              fieldId: fieldId,  // Assign fieldId from the request body
            });

            const remarksKey = `${key}_remarks`;
            if (fields[remarksKey]) {
              fieldEntries.push({
                fieldName: remarksKey,
                value: fields[remarksKey],
                fieldId: null,
              });
            }
          }

          sections.push({
            sectionName,
            sectionId: sectionId,  // Use sectionId from the request body
            fields: fieldEntries,
          });
        }

        break; // Only one shift phase should be active
      }
    }

    const submissionData = {
      userId,
      role,
      shiftId,
      shiftPhase: detectedShiftPhase,
      sections,
      isOperationalOnly: is_operational_only === 'true',
    };

    if (operational_details) {
      submissionData.operationalDetails = Object.values(operational_details).map((detail) => ({
        time: detail.time,
        description: detail.description,
      }));
    }

    const submission = new LogbookSubmission(submissionData);
    await submission.save();

    res.status(200).json({ success: true, message: 'Logbook submitted successfully' });
  } catch (error) {
    console.error('Logbook submission failed:', error);
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};


module.exports = { getFormByRole,submitLogbook };
