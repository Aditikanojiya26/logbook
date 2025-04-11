  const mongoose = require("mongoose");
  const connectDB = require("../backend/config/connectDB")
  const ParameterAuxiliarySCE = require("../backend/models/parameterAuxiliarySCE");

  // Connect to DB and then insert
  connectDB().then(() => {
    ParameterAuxiliarySCE.create({
      name: "Coal Mills",
      options: [
        { optionName: "A", status: "Ready" },
        { optionName: "B", status: "Ready" },
        { optionName: "C", status: "Ready" },
        { optionName: "D", status: "Ready" },
        { optionName: "E", status: "Ready" },
        { optionName: "F", status: "Ready" },
        { optionName: "G", status: "Ready" },
        { optionName: "H", status: "Ready" },
      ],
      readings: [
        { parameterName: "LOADING" },
        { parameterName: "CONSUMPTION" },
        { parameterName: "REJECTION TRIPS" },
        { parameterName: "REJECTION PENDING" },
      ],
      shiftTime: ["End"],
      unitId: "67f7cc79ddc2daec1fa33e25", // Replace with actual ObjectId if needed
    })
      .then(() => {
        console.log("Data inserted successfully");
        mongoose.disconnect();
      })
      .catch((err) => {
        console.error("Error inserting data:", err);
      });
  });
