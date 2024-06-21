const mongoose = require("mongoose");

const cardSchema = (module.exports = mongoose.Schema({
  name: { type: String, default: "" },
  img: {type: String, default: "" },
  initialPrice: { type: Number, default: 0 },
  initialIncome: { type: Number, default: 0 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  maxLevel: { type: Number, default: 0 },
  referralsRequired: { type: Number, default: 0 },
}));