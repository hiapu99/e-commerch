const JWT = require('jsonwebtoken');
const userModel = require('../models/user.models.js');

module.exports.requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not provided",
      });
    }
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in requireSignIn middleware:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }
};

module.exports.isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user || user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in admin middleware",
    });
  }
};
