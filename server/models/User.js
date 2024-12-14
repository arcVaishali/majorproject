const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userType: { type: String, enum: ["individual", "organization", "broker"] },
  walletAddress: String,
});

module.exports = mongoose.model("User", userSchema);
