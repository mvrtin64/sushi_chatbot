const User = require('../models/users');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;

    const newUser = new User({ name });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.findUserByName = async (name) => {
  try {
    const user = await User.findOne({ name });
    return user;
  } catch (error) {
    throw new Error(`Error finding user: ${error.message}`);
  }
};