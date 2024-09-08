const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // Reference to the Product model
      },
    ],
    statusOptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "statusOption",
      },
    ],
    typeOptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "typeOption",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("team", TeamSchema);
