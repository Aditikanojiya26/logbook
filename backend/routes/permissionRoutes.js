const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");
const { jwtAuthMiddleware } = require("../middleware/authMiddleware");

router.get("/assign-permission", jwtAuthMiddleware, permissionController.getAssignPermission);
router.post("/assign-permission", jwtAuthMiddleware, permissionController.assignPermission);

 
  
module.exports = router;
