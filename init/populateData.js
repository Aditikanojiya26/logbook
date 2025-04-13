const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../backend/models/user");
const Shift = require("../backend/models/shift");
const Unit = require("../backend/models/unit");

const SCE_Parameter = require("../backend/models/SCE_Parameter");
const Designation = require("../backend/models/designation.js");
const unit = require("../backend/models/unit");
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
      
        
          { name: "M/C", inputType: "select", shiftTime: "Beginning", options: ["BAR", "RSD", "FSD"], sectionName: "Operational Details" },
          { name: "DATE", inputType: "date", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "TIME", inputType: "time", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "LOAD", inputType: "number", shiftTime: "Beginning", unit: "MW", sectionName: "Operational Details" },
          { name: "FEED FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/HR", sectionName: "Operational Details" },
          { name: "ECO INLET FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/HR", sectionName: "Operational Details" },
          { name: "STEAM FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/HR", sectionName: "Operational Details" },
          { name: "TOTAL COAL FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/HR", sectionName: "Operational Details" },
        
          { name: "CST LEVEL", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "DMS-1 LEVEL", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "DMS-2 LEVEL", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "MOT LEVEL", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "COT LEVEL", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "DOT LEVEL", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "LDO LEVEL", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "HFO-A LEVEL", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "HFO-B LEVEL", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
        
          { name: "400 KV BUS NO-1", inputType: "text", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "BUS NO-2", inputType: "text", shiftTime: "Beginning", sectionName: "Operational Details" },
        
          { name: "MAX. BRG. VIB.", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "BRG. NO.", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
        
          { name: "ABS SHAFT VIB. MAX", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "ABS SHAFT VIB. MIN", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "PRDS CHARGED", inputType: "select", shiftTime: "Beginning", options: ["SELF", "AUX.BOILER"], sectionName: "Operational Details" },
        
          { name: "CW FORE BAY LEVEL", inputType: "number", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "DG SET READINESS:Main", inputType: "text", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "DG SET READINESS:Stand By", inputType: "text", shiftTime: "Beginning", sectionName: "Operational Details" },
          { name: "CT BLOW DOWN POSITION", inputType: "number", shiftTime: "Beginning", unit: "TPH", sectionName: "Operational Details" },
        
          { name: "CPU IN SERVICE", inputType: "checkbox", shiftTime: "Beginning", options: ["A", "B", "C"], sectionName: "Operational Details" },
        
          { name: "A.C. PLANT", inputType: "checkbox", shiftTime: "Beginning", options: ["CHILLER UNIT", "VAM UNIT"], sectionName: "Operational Details" },
        
          { name: "BOILER IN", inputType: "select", shiftTime: "Beginning", options: ["WET MODE", "DRY MODE"], sectionName: "Operational Details" },
        
          { name: "FGMO", inputType: "select", shiftTime: "Beginning", options: ["on", "off"], sectionName: "Operational Details" },
          { name: "CMC", inputType: "select", shiftTime: "Beginning", options: ["on", "off"], sectionName: "Operational Details" },
          { name: "TSE", inputType: "select", shiftTime: "Beginning", options: ["on", "off"], sectionName: "Operational Details" },
          { name: "Load Gradient", inputType: "select", shiftTime: "Beginning", options: ["on", "off"], sectionName: "Operational Details" },
        
        

        { name: "LOAD", inputType: "number", shiftTime: "Beginning", unit: "MW",sectionName:"Important Parameters"},
          { name: "FREQUENCY", inputType: "number", shiftTime: "Beginning", unit: "Hz", sectionName: "Important Parameters" },
          { name: "MAIN STEAM PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm²", sectionName: "Important Parameters" },
          { name: "MAIN STEAM TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C", sectionName: "Important Parameters" },
          { name: "MAIN STEAM FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr", sectionName: "Important Parameters" },
          { name: "CRH STEAM PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm²", sectionName: "Important Parameters" },
          { name: "CRH STEAM TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C", sectionName: "Important Parameters" },
          { name: "HRH STEAM PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "Kg/cm²", sectionName: "Important Parameters" },
          { name: "HRH STEAM TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C", sectionName: "Important Parameters" },
          { name: "FURNACE PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "mmWC", sectionName: "Important Parameters" },
          { name: "PA HEADER PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "mmWC", sectionName: "Important Parameters" },
          { name: "FD FAN OUTLET PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "mmWC", sectionName: "Important Parameters" },
          { name: "ID FAN INLET PRESSURE", inputType: "number", shiftTime: "Beginning", unit: "mmWC", sectionName: "Important Parameters" },
          { name: "APH INLET TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C", sectionName: "Important Parameters" },
          { name: "APH OUTLET TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C", sectionName: "Important Parameters" },
          { name: "APH DP", inputType: "number", shiftTime: "Beginning", unit: "mmWC", sectionName: "Important Parameters" },
          { name: "AIR FLOW", inputType: "number", shiftTime: "Beginning", unit: "Nm³/hr", sectionName: "Important Parameters" },
          { name: "FLUE GAS FLOW", inputType: "number", shiftTime: "Beginning", unit: "Nm³/hr", sectionName: "Important Parameters" },
          { name: "O₂", inputType: "number", shiftTime: "Beginning", unit: "%", sectionName: "Important Parameters" },
          { name: "CO₂", inputType: "number", shiftTime: "Beginning", unit: "%", sectionName: "Important Parameters" },
          { name: "CO", inputType: "number", shiftTime: "Beginning", unit: "ppm", sectionName: "Important Parameters" },
          { name: "SO₂", inputType: "number", shiftTime: "Beginning", unit: "ppm", sectionName: "Important Parameters" },
          { name: "NOx", inputType: "number", shiftTime: "Beginning", unit: "ppm", sectionName: "Important Parameters" },
          { name: "FLY ASH %", inputType: "number", shiftTime: "Beginning", unit: "%", sectionName: "Important Parameters" },
          { name: "BOTTOM ASH %", inputType: "number", shiftTime: "Beginning", unit: "%", sectionName: "Important Parameters" },
          { name: "MW", inputType: "number", shiftTime: "Beginning", unit: "MW", sectionName: "Important Parameters" },
          { name: "GENERATOR VOLTAGE", inputType: "number", shiftTime: "Beginning", unit: "kV", sectionName: "Important Parameters" },
          { name: "GENERATOR CURRENT", inputType: "number", shiftTime: "Beginning", unit: "A", sectionName: "Important Parameters" },
          { name: "GENERATOR POWER FACTOR", inputType: "number", shiftTime: "Beginning", unit: "", sectionName: "Important Parameters" },
          { name: "BOILER LOAD", inputType: "number", shiftTime: "Beginning", unit: "T/Hr", sectionName: "Important Parameters" },
          { name: "TURBINE LOAD", inputType: "number", shiftTime: "Beginning", unit: "MW", sectionName: "Important Parameters" },
          { name: "BOILER FEED WATER FLOW", inputType: "number", shiftTime: "Beginning", unit: "T/Hr", sectionName: "Important Parameters" },
          { name: "CW FLOW", inputType: "number", shiftTime: "Beginning", unit: "m³/hr", sectionName: "Important Parameters" },
          { name: "DM WATER FLOW", inputType: "number", shiftTime: "Beginning", unit: "m³/hr", sectionName: "Important Parameters" },
          { name: "DEMIN TANK LEVEL", inputType: "number", shiftTime: "Beginning", unit: "%", sectionName: "Important Parameters" },
          { name: "RAW WATER TANK LEVEL", inputType: "number", shiftTime: "Beginning", unit: "%", sectionName: "Important Parameters" },
          { name: "HOTWELL LEVEL", inputType: "number", shiftTime: "Beginning", unit: "%", sectionName: "Important Parameters" },
          { name: "BOILER DRUM LEVEL", inputType: "number", shiftTime: "Beginning", unit: "mm", sectionName: "Important Parameters" },
          { name: "COAL FEED RATE", inputType: "number", shiftTime: "Beginning", unit: "T/Hr", sectionName: "Important Parameters" },
          { name: "MILL OUTLET TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C", sectionName: "Important Parameters" },
          { name: "ESP INPUT KW", inputType: "number", shiftTime: "Beginning", unit: "kW", sectionName: "Important Parameters" },
          { name: "ESP EFFICIENCY", inputType: "number", shiftTime: "Beginning", unit: "%", sectionName: "Important Parameters" },
          { name: "COOLING TOWER INLET TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C", sectionName: "Important Parameters" },
          { name: "COOLING TOWER OUTLET TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C", sectionName: "Important Parameters" },
          { name: "GENERATOR BEARING TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C", sectionName: "Important Parameters" },
          { name: "TURBINE BEARING TEMPERATURE", inputType: "number", shiftTime: "Beginning", unit: "°C", sectionName: "Important Parameters" },
          { name: "BOILER TUBE LEAKAGE STATUS", inputType: "text", shiftTime: "Beginning", unit: "", sectionName: "Important Parameters" },
          { name: "EQUIPMENT ABNORMALITIES", inputType: "text", shiftTime: "Beginning", unit: "", sectionName: "Important Parameters" },
          { name: "OPERATIONAL NOTES", inputType: "text", shiftTime: "Beginning", unit: "", sectionName: "Important Parameters" },

          
            { name: "CST LEVEL", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "DMS-1 LEVEL", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "DMS-2 LEVEL", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "HPH OUT OF SERVICE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "CW FORE BAY LEVEL", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "LPH OUT OF SERVICE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "LDO LEVEL", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "HFO-A LEVEL", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "HFO-B LEVEL", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "H2 CYLINDER", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "H2 STOCK", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "H2 PRESS.", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "HFO GUNS IN SERVICE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "HFO GUNS CONSUMPTION", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "H2 BOTTOL CONSUMPTION", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "LDO GUNS IN SERVICE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "LDO GUNS CONSUMPTION", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "CO2 CYLINDER AVAILABLE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "ESP HOPPER NOT EMPTY", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "COAL CONSUMPTION (T/Hr)", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "ECO HOPPER NOT EMPTY", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "DM WATER CONSUMPTION (m3/Hr)", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "BAH EVACUATION TIME", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "BACKING DOWN FROM", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "BACKING DOWN TO", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "AHP HOPPER EVACUATION", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "DUCT HOPPER EVACUATION", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "TOTAL GENERATION (MWh)", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "SILO EVACUATION", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "MAX. LOAD (MW)", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "MIN. LOAD (MW)", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "HP WATER PUMP NOT AVAILABLE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "LP WATER PUMP NOT AVAILABLE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "SEAL WATER PUMP NOT AVAILABLE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "D.C. EQUIPMENT NOT AVAILABLE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "FIRE FIGHTING SYSTEM AVAILABILITY", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "D.G. SET AVAILABILITY", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "UAT-A", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "TIE TO UNIT BUS -A (MWh)", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "UAT-B", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "TIE TO UNIT BUS -B (MWh)", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "ST - 8 (MWh)", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "HEAT RATE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "REASON FOR OIL CONSUMPTION", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "REASON FOR LOW GENERATION", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "REASON FOR HIGH HEAT RATE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "MAJOR EQUIPMENT NOT AVAILABLE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" },
            { name: "MAJOR AUX. FAILURE", inputType: "text", shiftTime: "End", sectionName: "Shift End Parameters" }
          ,
            {
              name: "TOTAL GENERATION",
              unit: "MWh",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "Aux Power Consumption",
              unit: "",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "HFO CONSUMPTION",
              unit: "",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "MAX. LOAD",
              unit: "MW",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "MIN. LOAD",
              unit: "MW",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "UT - 8A",
              unit: "MWh",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "HFO Transfer to Unit #8",
              unit: "",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "COAL CONSUMPTION",
              unit: "",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "UT - 8B",
              unit: "MWh",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "LDO CONSUMPTION",
              unit: "",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "PICK HRS GENERATION",
              unit: "",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "ST - # 8",
              unit: "MWh",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "LDO Transfer to Unit #8",
              unit: "",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "H2 BOTTLE CONSUMPTION",
              unit: "",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "DM WATER CONSUMPTION",
              unit: "",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            {
              name: "UNIT TRIP",
              unit: "",
             shiftTime: "Midnight",
              sectionName: "Shift End Parameters",
             inputType: "text"
            },
            
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
