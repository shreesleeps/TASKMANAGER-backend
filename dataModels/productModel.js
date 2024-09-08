const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
