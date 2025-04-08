const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../backend/models/user");
const Shift = require("../backend/models/shift");
const Unit = require("../backend/models/unit");

const SCE_Parameter = require("../backend/models/SCE_Parameter");
const Designation = require("../backend/models/designation.js")
async function initDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/logbook");

    await User.deleteMany();
    await Shift.deleteMany();
    await Unit.deleteMany();
    await SCE_Parameter.deleteMany();
    await Designation.deleteMany();

    const users = [
      { name: "Aditi Kanojiya", email: "aditi@gmail.com", role: "PDE", password: "123456", contact: "1234567891" },
      { name: "Keni Patel", email: "keni@gmail.com", role: "BOILER", password: "123456", contact: "1234567891" },
      { name: "Keval Bhavsar", email: "keval@gmail.com", role: "SCE", password: "123456", contact: "1234567891" }
    ];

    for (let user of users) {
      await User.create(user);
    }

    // Insert shifts
    const shifts = [
      { name: "Morning Shift", time: "05:00 AM - 01:00 PM" },
      { name: "Afternoon Shift", time: "01:00 PM - 09:00 PM" },
      { name: "Night Shift", time: "09:00 PM - 05:00 AM" }
    ];

    for (let shift of shifts) {
      await Shift.create(shift)
    }

    const units = [
      { name: 1 },
      { name: 2 },
      { name: 3 },
      { name: 4 },
      { name: 5 },
      { name: 6 },
      { name: 7 },
      { name: 8 }
    ];

    for (let unit of units) {
      await Unit.create(unit);
    }

    const initialDesignations = ['SCE', 'PDE', 'FEED', 'BOILER', 'ATRS', 'BOP'];

    for (const name of initialDesignations) {
      {
        await Designation.create({ name });

      }



      const sceParameters = [
        { name: "LOAD", inputType: "number", shiftTime: "Beginning", unit: "MW" },
        { name: "FREQUENCY", inputType: "number", shiftTime: "Beginning", unit: "Hz" },
        { name: "MAIN STEAM PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm²" },
        { name: "MAIN STEAM TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "MAIN STEAM FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "CRH STEAM PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm²" },
        { name: "CRH STEAM TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "HRH STEAM PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm²" },
        { name: "HRH STEAM TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "FURNACE PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "mmWC" },
        { name: "PA HEADER PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "mmWC" },
        { name: "FURNACE WIND BOX DP", inputType: "number", shiftTime: "Beginning", unit: "mmWC" },
        { name: "ECONOMISER INLET FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "FEED WATER FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "SEPARATOR LEVEL", inputType: "number", shiftTime: "Beginning", unit: "METER" },
        { name: "SEPARATOR PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm²" },
        { name: "SH METAL TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "RH METAL TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "OPACITY", inputType: "number", shiftTime: "Beginning", unit: "mg/Nm³" },
        { name: "SOX", inputType: "number", shiftTime: "Beginning", unit: "ppm" },
        { name: "NOX", inputType: "number", shiftTime: "Beginning", unit: "ppm" },
        { name: "AXIAL SHIFT", inputType: "number", shiftTime: "Beginning", unit: "mm" },
        { name: "DIFF. EXPANSION HPT", inputType: "number", shiftTime: "Beginning", unit: "mm" },
        { name: "DIFF. EXPANSION IPT", inputType: "number", shiftTime: "Beginning", unit: "mm" },
        { name: "LUBE OIL TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "LUBE OIL PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "bar" },
        { name: "CONDENSER-1/2 PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "bar" },
        { name: "SEAL STEAM PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "milli bar" },
        { name: "SEAL STEAM TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "AUXILIARY PRDS PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "bar" },
        { name: "AUXILIARY PRDS TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "TDBFP-A/B SPEED", inputType: "number", shiftTime: "Beginning", unit: "RPM" },
        { name: "MDBFP-C SPEED", inputType: "number", shiftTime: "Beginning", unit: "RPM" },
        { name: "DERERATOR PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm²" },
        { name: "DERERATOR LEVEL", inputType: "number", shiftTime: "Beginning", unit: "mm" },
        { name: "HOT WELL LEVEL (COND.-1)", inputType: "number", shiftTime: "Beginning", unit: "mm" },
        { name: "HOT WELL LEVEL (COND.-2)", inputType: "number", shiftTime: "Beginning", unit: "mm" },
        { name: "H2 PURITY", inputType: "number", shiftTime: "Beginning", unit: "%" },
        { name: "H2 DEW POINT", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "H2 CASING PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm²" },
        { name: "SEAL OIL PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm²" },
        { name: "GENERATOR SEAL OIL DP", inputType: "number", shiftTime: "Beginning", unit: "milli bar" },
        { name: "COLD GAS TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "HOT GAS TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "WARM AIR TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "GENERATE EXHAUST PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "bar" },
        { name: "PRIMARY WATER CONDY", inputType: "number", shiftTime: "Beginning", unit: "microS/cm2" },
        { name: "PRIMARY WATER TEMP.", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "PRIMARY WATER FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "CPU-A INLET DP", inputType: "number", shiftTime: "Beginning", unit: "mili bar" },
        { name: "CPU-A  OUTLET DP", inputType: "number", shiftTime: "Beginning", unit: "mili bar" },
        { name: "CPU-B INLET DP", inputType: "number", shiftTime: "Beginning", unit: "mili bar" },
        { name: "CPU-B  OUTLET DP", inputType: "number", shiftTime: "Beginning", unit: "mili bar" },
        { name: "CPU-C INLET DP", inputType: "number", shiftTime: "Beginning", unit: "mili bar" },
        { name: "CPU-C OUTLET DP", inputType: "number", shiftTime: "Beginning", unit: "mili bar" },
        { name: "COAL MILL RC FEEDER-A FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "COAL MILL RC FEEDER-B FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "COAL MILL RC FEEDER-C FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "COAL MILL RC FEEDER-D FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "COAL MILL RC FEEDER-E FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "COAL MILL RC FEEDER-F FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "COAL MILL RC FEEDER-G FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "COAL MILL RC FEEDER-H FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "TOTAL COAL FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "HFO FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "LDO FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "TOTAL AIR FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr" },
        { name: "O2 AT ECO INLET", inputType: "number", shiftTime: "Beginning", unit: "%" },
        { name: "O2 AT ECO OUTLET", inputType: "number", shiftTime: "Beginning", unit: "%" },
        { name: "HFO HEADER PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm²" },
        { name: "HFO HEADER TEMPRATURE", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "ATOMISING STEAM PRESSURE ", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm2" },
        { name: "ATOMISING STEAM TEMP", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "LDO HEADER PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm2" },
        { name: "INSTRUMENT AIR PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm2" },
        { name: "CONDENSER 1/2 INLET TEMP", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "CONDENSER 1/2 OUTLET TEMP", inputType: "number", shiftTime: "Beginning", unit: "°C" },
        { name: "CST LEVEL", inputType: "text", shiftTime: "End" },
        { name: "DMS-1 LEVEL", inputType: "text", shiftTime: "End" },
        { name: "DMS-2 LEVEL", inputType: "text", shiftTime: "End" },
        { name: "CW FORE BAY LEVEL", inputType: "text", shiftTime: "End" },
        { name: "LDO LEVEL", inputType: "text", shiftTime: "End" },
        { name: "HFO-A LEVEL", inputType: "text", shiftTime: "End" },
        { name: "HFO-B LEVEL", inputType: "text", shiftTime: "End" },
        { name: "HFO GUNS IN SERVICE", inputType: "text", shiftTime: "End" },
        { name: "HFO GUNS CONSUMPTION", inputType: "text", shiftTime: "End" },
        { name: "LDO GUNS IN SERVICE", inputType: "text", shiftTime: "End" },
        { name: "LDO GUNS CONSUMPTION", inputType: "text", shiftTime: "End" },
        { name: "ESP HOPPER NOT EMPTY", inputType: "text", shiftTime: "End" },
        { name: "ECO HOPPER NOT EMPTY", inputType: "text", shiftTime: "End" },
        { name: "BAH EVACUATION TIME", inputType: "text", shiftTime: "End" },
        { name: "AHP & DUCT HOPPER EVACUATION", inputType: "text", shiftTime: "End" },
        { name: "SILO EVACUATION", inputType: "text", shiftTime: "End" },
        { name: "HP WATER PUMP NOT AVAILABLE", inputType: "text", shiftTime: "End" },
        { name: "LP WATER PUMP NOT AVAILABLE", inputType: "text", shiftTime: "End" },
        { name: "SEAL WATER PUMP NOT AVAILABLE", inputType: "text", shiftTime: "End" },
        { name: "D.C. EQUIPMENT NOT AVAILABLE", inputType: "text", shiftTime: "End" },
        { name: "FIRE FIGHTING SYSTEM : AVAILABILITY", inputType: "text", shiftTime: "End" },
        { name: "D.G. SET AVAILABILITY", inputType: "text", shiftTime: "End" },
        { name: "MAJOR EQUIPMENT NOT AVAILABLE", inputType: "text", shiftTime: "End" },
        { name: "MAJOR AUX. FAILURE", inputType: "text", shiftTime: "End" },
        { name: "HPH OUT OF SERVICE", inputType: "text", shiftTime: "End" },
        { name: "LPH OUT OF SERVICE", inputType: "text", shiftTime: "End" },
        { name: "H2 CYLINDER STOCK", inputType: "text", shiftTime: "End" },
        { name: "H2 CYLINDER PRESS.", inputType: "text", shiftTime: "End" },
        { name: "H2 BOTTLE CONSUMPTION", inputType: "text", shiftTime: "End" },
        { name: "CO2 CYLINDER AVAILABLE", inputType: "text", shiftTime: "End" },
        { name: "COAL CONSUMPTION", inputType: "text", shiftTime: "End", unit: "T/Hr" },
        { name: "DM WATER CONSUMPTION", inputType: "text", shiftTime: "End", unit: "m3/Hr" },
        { name: "BACKING DOWN FROM", inputType: "text", shiftTime: "End" },
        { name: "BACKING DOWN TO", inputType: "text", shiftTime: "End" },
        { name: "TOTAL GENERATION", inputType: "text", shiftTime: "End", unit: "MWh" },
        { name: "MAX. LOAD", inputType: "text", shiftTime: "End", unit: "MW" },
        { name: "MIN. LOAD", inputType: "text", shiftTime: "End", unit: "MW" },
        { name: "UAT-A/TIE TO UNIT BUS -A", inputType: "text", shiftTime: "End", unit: "MWh" },
        { name: "UAT-B/TIE TO UNIT BUS-B", inputType: "text", shiftTime: "End", unit: "MWh" },
        { name: "ST - 8", inputType: "text", shiftTime: "End", unit: "MWh" },
        { name: "HEAT RATE", inputType: "text", shiftTime: "End" },
        { name: "REASON FOR OIL CONSUMPTION", inputType: "text", shiftTime: "End" },
        { name: "REASON FOR LOW GENERATION", inputType: "text", shiftTime: "End" },
        { name: "REASON FOR HIGH HEAT RATE", inputType: "text", shiftTime: "End" },
        { "name": "Total Generation (MWh)", "inputType": "text", "shiftTime": "End" },
        { "name": "Max / Min Load (MW)", "inputType": "text", "shiftTime": "End" },
        { "name": "Coal Consumption", "inputType": "text", "shiftTime": "End" },
        { "name": "Peak Hours Generation", "inputType": "text", "shiftTime": "End" },
        { "name": "H₂ Bottle Consumption", "inputType": "text", "shiftTime": "End" },
        { "name": "DM Water Consumption", "inputType": "text", "shiftTime": "End" }
      ];

      for (let parameter of sceParameters) {
        await SCE_Parameter.create(parameter);
      }

    }
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    mongoose.connection.close();

  }
}

// Run script
initDatabase();
