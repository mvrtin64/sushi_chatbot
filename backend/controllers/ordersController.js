const Order = require('../models/orders');
const Menu = require('../models/menu');
const { AppError } = require('../middleware/errorHandler');
const { findUserByName } = require('./usersController'); 

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
    const { user, items, totalPrice } = req.body;

    const foundUser = await findUserByName(user);
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
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
