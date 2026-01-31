const express = require('express');
const router = express.Router();
const downloadsController = require('../controllers/downloadsController');

router.get('/reporte.xlsx', downloadsController.getReport);

module.exports = router;
