const mongoose = require("mongoose");
const Auxiliary = require("../backend/models/auxiliary");
const Designation = require("../backend/models/designation"); // Add this
const ParameterAuxiliarySCE = require("../backend/models/parameterAuxiliarySCE"); // adjust path as needed

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
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B" ,status:"Ready"}],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "LDO PUMP",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "OIL GUNS - AB TIER",
        options: [{ optionName: "1",status:"Ready" }, { optionName: "2",status:"Ready" }, { optionName: "3",status:"Ready" }, { optionName: "4",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "OIL GUNS - CD TIER",
        options: [{ optionName: "1",status:"Ready" }, { optionName: "2",status:"Ready" }, { optionName: "3",status:"Ready" }, { optionName: "4",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "OIL GUNS - EF TIER",
        options: [{ optionName: "1",status:"Ready" }, { optionName: "2",status:"Ready" }, { optionName: "3",status:"Ready" }, { optionName: "4",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "OIL GUNS - GH TIER",
        options: [{ optionName: "1",status:"Ready" }, { optionName: "2",status:"Ready" }, { optionName: "3",status:"Ready" }, { optionName: "4",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "AIR PREHEATER",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "SCANNER FAN",
        options: [{ optionName: "A.C.",status:"Ready" }, { optionName: "D.C.",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "ID FAN",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "FD FAN",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "PA FAN",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "SEAL AIR FAN",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "COAL MILLS",
        options: [
          { optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }, { optionName: "C",status:"Ready" }, { optionName: "D",status:"Ready" },
          { optionName: "E",status:"Ready" }, { optionName: "F",status:"Ready" }, { optionName: "G",status:"Ready" }, { optionName: "H",status:"Ready" }
        ],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "ESP RECTIFIER NOT IN SERVICE",
        options: [{ optionName: "OUT OF 72" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "CW PUMP",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "CW BOOTER PUMP",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }, { optionName: "C",status:"Ready" }, { optionName: "D",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "ACW PUMP",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "Jack Well Pump",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "BFP",
        options: [{ optionName: "MDBFP",status:"Ready" }, { optionName: "TDBFP A",status:"Ready" }, { optionName: "TDBFP B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "COND. VACUUM PUMP",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }, { optionName: "C",status:"Ready" }, { optionName: "D",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "BCW (BRP) PUMP",
        options: [{ optionName: "1",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "CEP",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }, { optionName: "C",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "HP HEATER Strain I",
        options: [
          { optionName: "HPH-6A",status:"Ready" }, { optionName: "7A",status:"Ready" }, { optionName: "8A" ,status:"Ready"}, { optionName: "6A-DESH",status:"Ready" }
        ],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "HP HEATER Strain II",
        options: [
          { optionName: "HPH-6B",status:"Ready" }, { optionName: "7B",status:"Ready" }, { optionName: "8B",status:"Ready" }, { optionName: "6B-DESH",status:"Ready" }
        ],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "SEAL OIL PUMP",
        options: [{ optionName: "A.C" ,status:"Ready"}, { optionName: "D.C",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "PRIMARY WATER PUMP",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "IAC",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }, { optionName: "C",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "SAC",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }, { optionName: "C",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "INSTRUMENT AIR DRYER",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }, { optionName: "C",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "UT",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      },
      {
        name: "UAT",
        options: [{ optionName: "A" ,status:"Ready"}, { optionName: "B",status:"Ready" }],
        sectionName: "Auxiliary Equipment",
        unitId: "67f7cc79ddc2daec1fa33e25",
        allowedUsers: [designationDocs.SCE],
        shiftTime: ["Beginning"],
      }

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

