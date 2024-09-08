const mongoose = require("mongoose");

const taskChatSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["MESSAGE", "UPDATES"], required: true },
    text: { type: String, required: true },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "task", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("taskChat", taskChatSchema);
