const mongoose = require("mongoose");

const categorySchema = (module.exports = mongoose.Schema({
  name: { type: String, default: "" },
}));