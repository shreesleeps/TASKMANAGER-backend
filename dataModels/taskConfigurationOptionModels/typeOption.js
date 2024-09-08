const mongoose = require("mongoose");

const typeOptionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    editable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("typeOption", typeOptionSchema);
