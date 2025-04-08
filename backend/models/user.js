const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/authMiddleware");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  role: String,
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  contact: String,
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.statics.matchPasswordAndGenerateToken = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  });

  return { user, token };
};


const User = mongoose.model("User", userSchema);
module.exports = User;
