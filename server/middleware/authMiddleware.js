const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel');
dotenv.config();

const errorHandler = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const protect = async (req, res, next) => {
  console.log('Cookies:', req.cookies); // Log cookies to verify if they are being read

  const token = req.cookies.access_token;

  if (!token) {
    console.log('No token found');
    return next(errorHandler(401, 'Unauthorized'));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err);
      return next(errorHandler(403, 'Forbidden'));
    }

    try {
      console.log('Decoded token:', decoded);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        console.log('User not found');
        return next(errorHandler(404, 'User not found'));
      }
      console.log('User found:', req.user);
      next();
    } catch (error) {
      console.log('User retrieval failed:', error);
      return next(errorHandler(500, 'Internal Server Error'));
    }
  });
};

module.exports = { protect };