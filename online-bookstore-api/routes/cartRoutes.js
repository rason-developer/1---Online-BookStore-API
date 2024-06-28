// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, cartController.getUserCart);
router.post('/', authenticateToken, cartController.addToCart);
router.put('/:itemId', authenticateToken, cartController.updateCartItem);
router.delete('/:itemId', authenticateToken, cartController.deleteCartItem);

module.exports = router;