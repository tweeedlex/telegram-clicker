  const mongoose = require("mongoose");

  const userSchema = (module.exports = mongoose.Schema({
    id: { type: Number, require: true, default: 0, unique: true },
    username: { type: String, default: "" },
    first_name: { type: String, default: "" },
    money: {type: Number, default: 0},
    availableTaps: {type: Number, default: 1500},
    multiplier: {type: Number, default: 1},
    last_money_request_timestamp: {type: Number, default: 0},
    roles: { type: Array, default: ["USER"] },
    language_code: { type: String, default: "en" },
    allows_write_to_pm: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
  }));