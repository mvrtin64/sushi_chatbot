const express = require('express');
const router = express.Router();
const { getAllOrders, addOrder, updateOrderStatus } = require('../controllers/ordersController');

// Routes for orders
router.get('/', getAllOrders);
router.post('/', addOrder);
router.patch('/:id', updateOrderStatus);

module.exports = router;
