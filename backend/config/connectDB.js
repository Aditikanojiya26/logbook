require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/logbook");
    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log(`Error at connectDB : ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
