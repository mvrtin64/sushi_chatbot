const express = require('express');
const router = express.Router();
const { getAllFAQs, addFAQ } = require('../controllers/faqsController');

router.get('/', getAllFAQs);
router.post('/', addFAQ);

module.exports = router;
