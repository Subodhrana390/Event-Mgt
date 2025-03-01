import twilio from "twilio";
import { AppError } from "../src/utils/AppError.js";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SSID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOTPFromTwilio = async (phoneNumber, genratedOTP) => {
  const response = await twilioClient.messages.create({
    body: `Your one-time OTP code is ${genratedOTP}`,
    from: "+17753805026",
    to: `+91${phoneNumber}`,
  });
  if (response.accountSid) {
    return true;
  } else {
    throw new AppError(500, `${response.errorMessage}`);
  }
};

export { sendOTPFromTwilio };
