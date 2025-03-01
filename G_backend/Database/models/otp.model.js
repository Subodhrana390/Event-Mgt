import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
  },
  expiresAt: { type: Date },
  attempts: {
    type: Number,
    default: 0,
  },
  lastRequestTime: {
    type: Date,
    default: Date.now,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  blockedUntil: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const OtpModel = mongoose.model("Otp", otpSchema);