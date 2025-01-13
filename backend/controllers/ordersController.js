const Order = require('../models/orders');
const mongoose = require('mongoose');
const { AppError } = require('../middleware/errorHandler');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('items.menuItem')
      .lean();
    
    return res.status(200).json(orders || []);
  } catch (error) {
    return res.status(500).json(new AppError(error.message, 500));
  }
};

exports.addOrder = async (req, res) => {
  try {
    if (!req.body.items || !Array.isArray(req.body.items)) {
      return res.status(400).json({ message: 'Invalid order items' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.user)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const userId = mongoose.Types.ObjectId(req.body.user);

    const updatedItems = req.body.items.map(item => {
      if (!mongoose.Types.ObjectId.isValid(item.menuItem)) {
        throw new Error(`Invalid menuItem ID: ${item.menuItem}`);
      }
      return {
        menuItem: mongoose.Types.ObjectId(item.menuItem),
        quantity: item.quantity,
        price: item.price,
      };
    });

    const order = new Order({
      user: userId,
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
