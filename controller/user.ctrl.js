const Usermdels = require('../models/user.models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


module.exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = await Usermdels.create({
      name,
      email,
      password: hashpassword,
      avatar
    });

    const user = await newUser.save();

    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
module.exports.loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists in the database
    const user = await Usermdels.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
    // If everything is correct, you can consider the user logged in
    res.status(200).json({ message: 'Login successful', user: user ,token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
