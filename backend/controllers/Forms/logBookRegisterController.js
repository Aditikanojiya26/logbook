const LogBookRegister = require("../../models/logBookRegister");
const LogbookSubmission = require("../../models/SubmitLog");

const getLogEntry = async (body) => {
  try {
    const { role, shiftId, unitId } = body;

    // Get current shift time window
    const { shiftStart, shiftEnd } = getCurrentShiftWindow();

    // Find logbook entry within current shift window
    const entry = await LogBookRegister.findOne({
      role,
      unitId,
      shiftId,
      createdAt: { $gte: shiftStart, $lte: shiftEnd },
    });

    if (!entry) {
      console.log("Entry not found for current shift");
      return {
        success: false,
        message: "Entry not found for current shift",
      };
    }

    // Build activeShiftPhases as before
    const { shiftPhase, logEntryId } = entry;

    const activeShiftPhases = [
      {
        phase: "shiftBeg",
        status: shiftPhase.shiftBeg || false,
        logEntryId: shiftPhase.shiftBeg ? logEntryId.shiftBeg : null,
      },
      {
        phase: "shiftMid",
        status: shiftPhase.shiftMid || false,
        logEntryId: shiftPhase.shiftMid ? logEntryId.shiftMid : null,
      },
      {
        phase: "shiftEnd",
        status: shiftPhase.shiftEnd || false,
        logEntryId: shiftPhase.shiftEnd ? logEntryId.shiftEnd : null,
      },
      {
        phase: "shiftMidNight",
        status: shiftPhase.shiftMidNight || false,
        logEntryId: shiftPhase.shiftMidNight ? logEntryId.shiftMidNight : null,
      },
    ];

    return {
      activeShiftPhases,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Error while searching for log entry",
    };
  }
};

const createLogEntry = async (logEntryData) => {
  try {
    const { userId, unitId, role, shiftId, phase, entryId } = logEntryData;
    // Validate required fields
    if (!userId || !unitId || !role || !shiftId) {
      return {
        success: false,
        message: "Missing required fields: userId, unitId, role, shiftId",
      };
    }
    console.log(phase);
    // Get current shift time window
    const { shiftStart, shiftEnd } = getCurrentShiftWindow();
    //is entry created already?
    const existingEntry = await LogBookRegister.findOne({
      role,
      unitId,
      shiftId,
      createdAt: { $gte: shiftStart, $lte: shiftEnd },
    });

    if (!existingEntry) {
      const initialPhase = {
        shiftBeg: false,
        shiftMid: false,
        shiftEnd: false,
        shiftMidNight: false,
        operationalDetails: false,
      };
      initialPhase[phase] = true;
      const logEntryId = {
        shiftBeg: null,
        shiftMid: null,
        shiftEnd: null,
        shiftMidNight: null,
      };
      logEntryId[phase] = entryId;
      // Create a new log entry
      const newLogEntry = new LogBookRegister({
        userId,
        unitId,
        role,
        shiftId,
        shiftPhase: initialPhase || {},
        logEntryId: logEntryId || {},
      });

      await newLogEntry.save();
      return {
        success: true,
        entryId: newLogEntry._id,
        msg: "New entry created",
      };
    } else {
      // update the existing entry
      existingEntry.shiftPhase[phase] = true;
      existingEntry.logEntryId[phase] = entryId;
      await existingEntry.save();
      return {
        success: true,
        entryId: existingEntry._id,
        msg: "Entry updated",
      };
    }
  } catch (error) {
    console.error("Error creating log entry:", error);
    return {
      message: "Internal server error while creating log entry",
    };
  }
};

const createPrefill = async (logEntryIds) => {
  // logEntryIds example: { shiftBeg, shiftMid, shiftEnd, shiftMidNight }
  const prefillData = {};

  // For each phase, load the corresponding LogbookSubmission (if exists)
  for (const [phase, submissionId] of Object.entries(logEntryIds)) {
    if (!submissionId) continue; // skip if no submission for this phase

    const submission = await LogbookSubmission.findById(submissionId);
    if (!submission) continue; // skip if submission not found

    // Initialize phase-level container
    if (!prefillData[phase]) {
      prefillData[phase] = {};
    }

    submission.sections.forEach((section) => {
      const sectionName = section.sectionName;
      if (!prefillData[phase][sectionName]) {
        prefillData[phase][sectionName] = {};
      }

      section.fields.forEach((field) => {
        prefillData[phase][sectionName][field.fieldName] = field.value;
      });
    });
  }
  console.log(JSON.stringify(prefillData, null, 2));
  return prefillData;
};

const getCurrentShiftWindow = () => {
  const now = new Date();
  const hour = now.getHours();

  let shiftStart, shiftEnd;

  if (hour >= 5 && hour < 13) {
    // Morning shift
    shiftStart = new Date(now.setHours(5, 0, 0, 0));
    shiftEnd = new Date(now.setHours(13, 0, 0, 0));
  } else if (hour >= 13 && hour < 21) {
    // Afternoon shift
    shiftStart = new Date(now.setHours(13, 0, 0, 0));
    shiftEnd = new Date(now.setHours(21, 0, 0, 0));
  } else {
    // Night shift
    if (hour >= 21) {
      // Night shift started today
      shiftStart = new Date(now.setHours(21, 0, 0, 0));
      shiftEnd = new Date(shiftStart.getTime() + 8 * 60 * 60 * 1000); // 8 hours duration
    } else {
      // Night shift started yesterday
      shiftEnd = new Date(now.setHours(5, 0, 0, 0));
      shiftStart = new Date(shiftEnd.getTime() - 8 * 60 * 60 * 1000); // 8 hours before 5 AM
    }
  }

  return { shiftStart, shiftEnd };
};

module.exports = {
  createLogEntry,
  getLogEntry,
  createPrefill,
  getCurrentShiftWindow,
};
