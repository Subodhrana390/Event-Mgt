import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    status: String,
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);

