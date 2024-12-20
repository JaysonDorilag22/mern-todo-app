const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../helpers/token");
const { uploadImage } = require("../utils/uploadImage");

const testapi = async (req, res) => {
  try {
    res.json({ message: "API is working" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const avatar = req.file;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const avatarUploadResult = avatar
      ? await uploadImage(avatar.path, "avatars")
      : null;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: avatarUploadResult,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);

      // Set the token in an HTTP-only cookie named 'access_token'
      res.cookie("access_token", token, {
       
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      // Log the token to verify it is being generated and set
      console.log('Token set in cookie:', token);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to false if not using HTTPS
    sameSite: 'None', // Adjust as needed
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { signUp, signIn, logout, testapi };