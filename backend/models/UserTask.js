const mongoose = require("mongoose");

const taskSchema = (module.exports = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  date: { type: Date, required: true, default: Date.now() },
}));