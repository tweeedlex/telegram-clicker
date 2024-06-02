const mongoose = require("mongoose");

const userSchema = (module.exports = mongoose.Schema({
  username: { type: String, require: true, default: "" },
  name: { type: String, default: "" },
  roles: { type: Array, default: ["USER"] },
}));
