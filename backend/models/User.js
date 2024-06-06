const mongoose = require("mongoose");

const userSchema = (module.exports = mongoose.Schema({
  id: { type: Number, require: true, default: 0 },
  username: { type: String, require: true, default: "" },
  name: { type: String, default: "" },
  roles: { type: Array, default: ["USER"] },
  language_code: { type: String, default: "en" },
  allows_write_to_pm: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
}));
