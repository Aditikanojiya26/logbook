const express = require('express');
const { getParameters } = require('../controllers/parameterController');
const { addParameter } = require('../controllers/parameterController');
const { updateParameter } = require('../controllers/parameterController');
const { deleteParameter } = require('../controllers/parameterController');
const { getParameterById } = require("../controllers/parameterController");



const router = express.Router();

router.get("/parameters/:id", getParameterById);
router.get('/parameters', getParameters);
router.post('/parameters', addParameter);
router.put('/parameters/:id',updateParameter);
router.delete('/parameters/:id', deleteParameter);

module.exports = router;
