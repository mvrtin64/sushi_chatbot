const express = require('express');
const router = express.Router();
const { checkBusinessHours } = require('../controllers/businessHoursController');

router.get('/', checkBusinessHours);

module.exports = router; 