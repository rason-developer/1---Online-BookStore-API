
const Cart = require('../models/Cart');

exports.getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.getUserCart(userId);
        res.status(200).json(cart);
    } catch (err) {
        console.error('Error retrieving user cart:', err);
        res.status(500).json({ message: 'Error retrieving user cart', err });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId, quantity } = req.body;
        const addedItem = await Cart.addToCart(userId, bookId, quantity);
        res.status(201).json({ message: 'Item added to cart successfully', addedItem });
    } catch (err) {
        console.error('Error adding item to cart:', err);
        res.status(500).json({ message: 'Error adding item to cart', err });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId } = req.params;
        const { quantity } = req.body;
        const updatedItem = await Cart.updateCartItem(userId, itemId, quantity);
        res.status(200).json({ message: 'Cart item updated successfully', updatedItem });
    } catch (err) {
        console.error('Error updating cart item:', err);
        res.status(500).json({ message: 'Error updating cart item', err });
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId } = req.params;
        await Cart.deleteCartItem(userId, itemId);
        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (err) {
        console.error('Error deleting cart item:', err);
        res.status(500).json({ message: 'Error deleting cart item', err });
    }
};