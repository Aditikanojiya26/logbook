const LogBookRegister = require("../../models/logBookRegister");
const LogbookSubmission = require("../../models/SubmitLog");
const Shift = require("../../models/shift");
const Unit = require("../../models/unit");
const { createPrefill } = require("./logBookRegisterController");

const getSearchableLog = async (req, res) => {
  let searchableLog = await LogBookRegister.find({});
  searchableLog = await Promise.all(
    searchableLog.map(async (log) => {
      const shift = await Shift.findById(log.shiftId);
      const unit = await Unit.findById(log.unitId);
      const shiftName = shift.name;
      const unitName = unit.name;
      log = log.toObject();
      log.shiftId = shiftName;
      log.unitId = unitName;
      return log;
    })
  );
  return res.json({ success: true, logs: searchableLog });
};

const searchableLogTable = async (req, res) => {
  return res.render("searchableLog");
};

const viewLogEntry = async (req, res) => {
  const logDataId = req.params.id;

  try {
    const logData = await LogbookSubmission.findById(logDataId);
    if (!logData) {
      res.json({ success: false, message: "Cannot find the logdata" });
    }
    const phase = logData.shiftPhase;
    const prefillDataParams = {
      [phase]: logDataId,
    };
    const prefillData = await createPrefill(prefillDataParams);
    console.log(prefillData);
    res.json({ success: true, data: prefillData });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Error while finding data" });
  }
};
module.exports = {
  getSearchableLog,
  searchableLogTable,
  viewLogEntry,
};
