const ShiftData = require("../models/sce");
const SectionTimeLimit = require("../models/SectionTimeLimit");
const Shift = require("../models/shift");

const isWithinTimeLimit = async (section, shiftStartTime) => {
    console.log(`Checking section: ${section}`);

  
    const sectionTime = await SectionTimeLimit.findOne({ section: { $regex: new RegExp(`^${section}$`, "i") } });
  
    if (!sectionTime) {
      console.error(`Section not found in DB: ${section}`);
      return { valid: false, message: `Invalid section: ${section}` };
    }
  
    console.log(`Found section: ${JSON.stringify(sectionTime)}`);
  
    const shiftStart = new Date(shiftStartTime);
    console.log(`Shift start time: ${shiftStart}`);
    const currentTime = new Date();
    console.log(`Current time: ${currentTime}`);
  
    const sectionStartTime = new Date(shiftStart.getTime() + sectionTime.relativeStartMinutes * 60000);
    const sectionEndTime = new Date(shiftStart.getTime() + sectionTime.relativeEndMinutes * 60000);
    console.log(`Section start time: ${sectionStartTime} and end time: ${sectionEndTime}`);
    if (currentTime < sectionStartTime || currentTime > sectionEndTime) {
      return { valid: false, message: `Submission for ${section} is not allowed at this time.` };
    }
  
    return { valid: true };
  };
  
  

const validateSectionOrder = async (shiftData, section) => {
    const sectionOrder = ["shiftBeginning", "shiftMid", "shiftEnd", "operationPerformed"];
    const currentIndex = sectionOrder.indexOf(section);
  
    if (currentIndex === -1) {
      return { valid: false, message: `Invalid section: ${section} due to section order` };
    }
  
    if (currentIndex === 0) {
      return { valid: true };
    }
  
    const previousSection = sectionOrder[currentIndex - 1];
    if (!shiftData[previousSection]) {
      return { valid: false, message: `Submit ${previousSection} before ${section}.` };
    }
  
    return { valid: true };
  };
  

  const parseShiftStartTime = (shiftTimeString) => {

    const [startTimeStr] = shiftTimeString.split(" - "); 
    const currentDate = new Date(); 
  
    const shiftStartTime = new Date(`${currentDate.toDateString()} ${startTimeStr}`);
  
    return shiftStartTime;
  };
  
  const submitSection = async (req, res) => {
    try {
        const { userId, unitId, shiftId, section, parameters, inServiceAuxiliaries } = req.body;
        console.log(`Received data: ${JSON.stringify(req.body)}`);
        const shift = await Shift.findOne({ _id: shiftId });
        console.log(`Shift details: ${JSON.stringify(shift)}`);
        if (!shift) return res.status(404).json({ message: "Shift not found" });

        const shiftStartTime = parseShiftStartTime(shift.time);
        console.log(`Shift start time: ${shiftStartTime}`);

        const timeCheck = await isWithinTimeLimit(section, shiftStartTime);
        if (!timeCheck.valid) return res.status(400).json({ message: timeCheck.message });

        let shiftData = await ShiftData.findOne({ userId, unitId, shiftId });

        if (!shiftData) {
            console.log("Creating new shiftData document...");
            shiftData = new ShiftData({ 
                userId, 
                unitId, 
                shiftId, 
                [section]: {
                  parameters,
                  inServiceAuxiliaries,
              }
            });
        } else {
            console.log(`Existing shiftData: ${JSON.stringify(shiftData)}`);

            const orderCheck = await validateSectionOrder(shiftData, section);
            if (!orderCheck.valid) return res.status(400).json({ message: orderCheck.message });

            // Check if the section was already submitted
            if (shiftData[section] && Object.keys(shiftData[section]).length > 0) {
                return res.status(400).json({ message: `Section ${section} is already submitted.` });
            }

            // Store data
            shiftData[section] = {
              parameters,
              inServiceAuxiliaries,
          };
        }
        // Add this before shiftData.save()
        
        console.log(`ShiftData object before save:`, shiftData);

        await shiftData.save();
        console.log(`Section ${section} saved successfully.`);

        res.status(200).json({ message: `Section ${section} submitted successfully`, shiftData });

    } catch (error) {
        console.error("Error submitting section:", error);
        res.status(500).json({ message: "Error submitting section", error });
    }
};


  

const getShiftData = async (req, res) => {
  try {
    const shiftData = await ShiftData.findOne({ shiftId: req.params.shiftId });
    if (!shiftData) return res.status(404).json({ message: "Shift data not found" });

    res.status(200).json(shiftData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shift data", error });
  }
};

const setSectionTimeLimit = async (req, res) => {
    try {
      const sections = req.body; 
  
      for (const sectionData of sections) {
        await SectionTimeLimit.findOneAndUpdate(
          { section: sectionData.section },
          { relativeStartMinutes: sectionData.relativeStartMinutes, relativeEndMinutes: sectionData.relativeEndMinutes },
          { upsert: true }
        );
      }
  
      res.status(200).json({ message: "All sections (including operationPerformed) set successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error setting time limits", error });
    }
  };
  

module.exports = { submitSection, getShiftData, setSectionTimeLimit };
