const mongoose = require("mongoose");
const Auxiliary = require("../backend/models/auxiliary");
const Designation = require("../backend/models/designation"); // Add this

async function initDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/logbook");
    await Auxiliary.deleteMany();

    // Step 1: Ensure designations are created
    const designations = ["SCE", "PDE", "FEED", "BOILER", "ATRS", "BOP"];
    let designationDocs = {};

    for (let name of designations) {
      let existing = await Designation.findOne({ name });
      if (!existing) {
        existing = await Designation.create({ name });
      }
      designationDocs[name] = existing._id;
    }

    let aux = [
      {
        name: "FO PUMP",
        options: [
          { optionName: "A", status: "Ready" },
          { optionName: "B", status: "Ready" },
        ],
        unitId: "67ed879805e44670d5a301b0",
        allowedUsers: [designationDocs.SCE], // Example
      },
      {
        name: "LDO PUMP",
        options: [
          { optionName: "A", status: "Ready" },
          { optionName: "B", status: "Ready" },
        ],
        unitId: "67ed879805e44670d5a301b0",
        allowedUsers: [designationDocs.SCE],
      },
      {
        name: "OIL GUNS - AB TIER",
        options: [
          { optionName: "1", status: "Ready" },
          { optionName: "2", status: "Ready" },
          { optionName: "3", status: "Ready" },
          { optionName: "4", status: "Ready" },
        ],
        unitId: "67ed879805e44670d5a301b0",
        allowedUsers: [designationDocs.SCE],
      },
     
    ];

    for (let auxiliary of aux) {
      await Auxiliary.create(auxiliary);
    }

    console.log("Auxiliary data initialized.");
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    mongoose.connection.close();
  }
}

// Run the script
initDatabase();
