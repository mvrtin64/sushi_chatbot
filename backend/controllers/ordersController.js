const Order = require('../models/orders');
const mongoose = require('mongoose');


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.menuItem');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addOrder = async (req, res) => {
  try {
    const updatedItems = req.body.items.map((item) => ({
      menuItem: mongoose.Types.ObjectId(item.menuItem),
      quantity: item.quantity,
      price: item.price,
    }));

    const order = new Order({
      user: mongoose.Types.ObjectId(req.body.user),
      items: updatedItems,
      totalPrice: req.body.totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
