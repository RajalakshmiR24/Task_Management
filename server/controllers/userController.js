const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token"); 

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({code:400, message: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({code:201, message: "User registered successfully" });
  } catch (err) {
    res.status(200).json({ code:500, message: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } 
      );
  
      
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); 
  
      const newToken = new Token({
        userId: user._id,
        token,
        expiresAt,
      });
  
      await newToken.save();
  
      res.status(200).json({code:200, token });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };