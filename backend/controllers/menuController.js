const Menu = require('../models/menu');

exports.getAllMenuItems = async (req, res) => {
  try {
    console.log('Fetching menu items...');
    const menu = await Menu.find().lean();
    console.log(`Found ${menu.length} menu items`);
    
    if (!menu || menu.length === 0) {
      console.log('No menu items found in database');
      return res.status(200).json([]);
    }
    
    res.status(200).json(menu);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const menuItem = new Menu(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
