const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = user => jwt.sign(
  { id: user._id, user_type: user.user_type },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

exports.signup = async (req, res) => {
  try {
    const { email, password, user_type } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ email, password_hash: hash, user_type });
    await user.save();

    res.status(201).json({ token: generateToken(user), user: { id: user._id, email, user_type } });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ msg: "Error during signup", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({ token: generateToken(user), user: { id: user._id, email, user_type: user.user_type } });
  } catch (err) {
    res.status(500).json({ msg: "Error during login", err });
  }
};
