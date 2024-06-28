const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getAllOrders();
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    try {
        const updatedOrder = await Order.updateOrderStatus(orderId, status);
        res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (err) {
        console.error(`Error updating order ${orderId} status:`, err);
        res.status(500).json({ message: 'Error updating order status' });
    }
};

exports.getOrderItems = async (req, res) => {
    const orderId = req.params.id;

    try {
        const orderItems = await OrderItem.getOrderItems(orderId);
        res.status(200).json(orderItems);
    } catch (err) {
        console.error(`Error fetching order items for order ${orderId}:`, err);
        res.status(500).json({ message: 'Error fetching order items' });
    }
};
