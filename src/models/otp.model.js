import { model, Schema } from "mongoose";

const OTPSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    otp: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const OTPModel = model("OTP", OTPSchema);

OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });
