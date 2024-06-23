const mongoose = require("mongoose");

const userSchema = (module.exports = mongoose.Schema({
  userId: { type: Number, require: true, default: 0, unique: true, ref: "User" },
  date: { type: Number, require: true },
}));