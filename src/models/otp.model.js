const {model,Schema} = require("mongoose");

const otpSchema = Schema(
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
      type: Schema.Types.ObjectId,
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

const Otp = model("Otp", otpSchema);
module.exports = Otp;
