import apiClient from "../api/ApiClient";
import Joi from "joi";

const phoneSchema = Joi.string()
  .pattern(/^\d{10}$/)
  .required();
const otpSchema = Joi.string()
  .pattern(/^\d{6}$/)
  .required();

const AuthService = {
  sendOtp: async (phoneNumber) => {
    const { error } = phoneSchema.validate(phoneNumber);
    if (error) throw new Error("Invalid phone number. It must be 10 digits.");

    try {
      const response = await apiClient.post("/auth/send-otp", { phoneNumber });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to send OTP.");
    }
  },

  verifyOtp: async (phoneNumber, otp) => {
    const phoneValidation = phoneSchema.validate(phoneNumber);
    const otpValidation = otpSchema.validate(otp);

    if (phoneValidation.error) throw new Error("Invalid phone number.");
    if (otpValidation.error) throw new Error("Invalid OTP.");

    try {
      const response = await apiClient.post("/auth/verify-otp", {
        phoneNumber,
        otp,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to verify OTP.");
    }
  },
};

export default AuthService;
