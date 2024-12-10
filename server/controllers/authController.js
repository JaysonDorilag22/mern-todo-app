const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../helpers/token");
const { checkMissingFields } = require("../utils/validationUtils");



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
    const missingFields = checkMissingFields(['name', 'email', 'password'], req.body);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const avatarUploadResult = avatar ? await uploadImage(avatar.path, "avatars") : null;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: avatarUploadResult,
    });

    if (user) {
      const token = generateToken(user._id);

      // Set the token in an HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: token,
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
    const missingFields = checkMissingFields(['email', 'password'], req.body);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);

      // Set the token in an HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

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

module.exports = { signUp, signIn, testapi };