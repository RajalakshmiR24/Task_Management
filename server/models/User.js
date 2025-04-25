const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); 
  try {
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 
    next(); 
  } catch (err) {
    next(err); 
  }
});


userSchema.methods.comparePassword = async function (inputPassword) {
  try {
    return await bcrypt.compare(inputPassword, this.password); 
  } catch (err) {
    throw new Error("Password comparison failed");
  }
};

module.exports = mongoose.model("User", userSchema);
