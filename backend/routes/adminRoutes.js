const express = require('express');
const router = express.Router();
const adminController = require('../controllers/Admin/adminController');

router.get('/CreateForm', adminController.showMasterForm);
router.post('/CreateForm', adminController.createMasterForm);

module.exports = router;