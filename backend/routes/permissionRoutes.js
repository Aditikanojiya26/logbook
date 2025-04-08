const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");
const { jwtAuthMiddleware } = require("../middleware/authMiddleware");

router.get("/assign-permission", jwtAuthMiddleware, permissionController.getAssignPermission);
router.post("/assign-permission", jwtAuthMiddleware, permissionController.assignPermission);
router.get("/parameters", permissionController.getParameters);
router.get('/shift-form',permissionController.getForm)
 
  
module.exports = router;
