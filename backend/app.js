require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const shiftRoutes = require("../backend/routes/shiftRoutes");
const authRoutes = require("./routes/authRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const sceRoutes = require("../backend/routes/sceRoutes");
const adminRoutes = require("../backend/routes/adminRoutes");
const logbookFormRoutes = require("../backend/routes/logbookFormRoutes");
const registerRoutes = require("./routes/registerRoutes");
const searchableLog = require("./routes/searchableLogsRoutes")
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../website/views"));
app.use(express.static(path.join(__dirname, "../website/public")));

// Routes
app.use("/logRegister", registerRoutes);
app.use("/", authRoutes);
app.use("/", searchableLog);
app.use("/", permissionRoutes);
app.use("/", sceRoutes);
app.use("/", shiftRoutes);
app.use("/", logbookFormRoutes);
app.use("/admin", adminRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
