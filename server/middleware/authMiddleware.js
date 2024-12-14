const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");
dotenv.config();

const errorHandler = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const protect = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return next(errorHandler(403, "Forbidden"));
    }

    try {
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return next(errorHandler(404, "User not found"));
      }
      next();
    } catch (error) {
      return next(errorHandler(500, "Internal Server Error"));
    }
  });
};

module.exports = { protect };
