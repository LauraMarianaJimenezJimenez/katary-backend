const express = require('express');
const router = express.Router();
const downloadsController = require('../controllers/downloadsController');

router.get('/downloads', downloadsController.downloadForms);

module.exports = router;
