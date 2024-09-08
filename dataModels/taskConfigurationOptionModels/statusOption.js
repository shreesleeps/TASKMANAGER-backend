const mongoose = require("mongoose");

const statusOptionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    type: {
      type: String,
      enum: ["NOT_STARTED", "ACTIVE", "DONE"],
      default: "NOT_STARTED",
    },
    editable: { type: Boolean, default: true },
    hexColor: { type: String, default: "#87909E" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("statusOption", statusOptionSchema);
