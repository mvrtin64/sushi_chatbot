const Order = require('../models/orders');
const User = require('../models/users');
const Menu = require('../models/menu'); 
const { AppError } = require('../middleware/errorHandler');
const { findUserByName } = require('./usersController'); 

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().lean();

    for (const order of orders) {
      order.user = await User.findById(order.user).lean();
      for (const item of order.items) {
        item.menuItem = await Menu.findById(item.menuItem).lean();
      }
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener las órdenes:", error.message);
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: error.message,
    });
  }
};

exports.addOrder = async (req, res) => {
  try {
    const { user, items, totalPrice } = req.body;

    const foundUser = await findUserByName(user);
    if (!foundUser) {
      throw new AppError('User not found', 404);
    }

    const formattedItems = [];
    for (const item of items) {
      const menuItem = await Menu.findOne({ name: item.menuItem });

      if (!menuItem) {
        return res.status(404).json({ message: `Menu item "${item.menuItem}" not found` });
      }

      formattedItems.push({
        menuItem: menuItem._id, 
        quantity: item.quantity,
        price: item.price,
      });
    }

    const order = new Order({
      user: foundUser._id,
      items: formattedItems,
      totalPrice,
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
