const express = require('express');
const router = express.Router();
const traController = require('../controllers/traController');
const conductaController = require('../controllers/conductaController');

router.post('/tra', traController.submitTra);
router.post('/conducta', conductaController.submitConducta);

module.exports = router;

