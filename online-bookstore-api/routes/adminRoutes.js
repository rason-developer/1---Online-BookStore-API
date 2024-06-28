

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// GET all orders (admin)
router.get('/orders', adminController.getAllOrders);

// PUT update order status (admin)
router.put('/orders/:id', adminController.updateOrderStatus);

// GET order items for a specific order (admin)
router.get('/orders/:id/items', adminController.getOrderItems);

module.exports = router;
