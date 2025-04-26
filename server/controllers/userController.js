const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ code: 400, message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ code: 400, message: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res
      .status(201)
      .json({ code: 201, message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, message: "Server error", error: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ code: 400, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const existingToken = await Token.findOne({ userId: user._id });

    if (existingToken) {
      existingToken.token = token;
      existingToken.expiresAt = expiresAt;
      await existingToken.save();
    } else {
      const newToken = new Token({
        userId: user._id,
        token,
        expiresAt,
      });
      await newToken.save();
    }

    res.status(200).json({ code: 200, message: "Login successful", token });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, message: "Server error", error: err.message });
  }
};
