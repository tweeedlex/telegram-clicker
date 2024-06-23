const mongoose = require("mongoose");

const taskSchema = (module.exports = mongoose.Schema({
  name: { type: String, default: "", required: true },
  link: { type: String, default: "", required: true },
  image: { type: String, default: "" },
  reward_money: { type: Number, default: 0 },
  reward_card: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
}));