const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    priority: {
      type: String,
      enum: [null, "Low", "Medium", "High", "Urgent", "Critical"],
      default: null,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    watcher: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "statusOption",
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "typeOption",
      default: null,
    },

    dueOn: { type: Date, default: null },
    closedOn: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", TaskSchema);
