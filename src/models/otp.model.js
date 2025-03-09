const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    otp: {
      type: String,
      trim: true,
    },
    expires: {
      type: Date,
      default: null,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;
