const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const {items, totalAmount} = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({message: "Order Items are required"});
        }
        const order= await Order.placeOrder(userId, items, totalAmount);
        res.status(201).json({message: "Order placed successfully", order});

    }catch (err) {
        res.status(500).json({message:"Error placing Order", err});
    }
};

exports.getUserOrders = async (req, res) =>  {
    try {
        const userId = req.user.id;
        const orders = await Order.getUserOrders(userId);
        res.status(200).json(orders);
    }catch(err) {
        res.status(500).json({message:"Error fetching user orders", err});
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        res.status(200).json(order);
    }catch (err) {
        res.status(500).json({ message: 'Error fetching order details', err });

    }
};

