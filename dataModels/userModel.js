const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "SUPER_ADMIN"],
      default: "USER",
    },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
