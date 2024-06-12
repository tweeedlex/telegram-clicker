const mongoose = require("mongoose");

const userCardSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "Card", required: true },
  level: { type: Number, default: 1 },
  purchasePrice: { type: Number, default: 0 },
  purchaseDate: { type: Date, default: Date.now },
});

module.exports = userCardSchema
