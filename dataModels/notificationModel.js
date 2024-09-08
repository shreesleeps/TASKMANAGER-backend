const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    seen: { type: Boolean, default: false },

    clickAction: {
      type: String,
      enum: [null, "TEAM", "PRODUCT", "TASK"],
      default: null,
    },

    correspondingIds: {
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "team",
        default: null,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        default: null,
      },
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
        default: null,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", NotificationSchema);
