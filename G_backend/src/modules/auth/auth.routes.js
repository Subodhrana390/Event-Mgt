import { Router } from "express";
import {
  logout,
  protectedRoutes,
  refreshTokenRotation,
  sendOtp,
  verifyOtp,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import { logoutValidation, refreshTokenValidation, sentOTPValidation, verifyOTPValidation } from "./auth.validation.js";

const authRouter = Router();
authRouter.route("/send-otp").post(validate(sentOTPValidation), sendOtp);
authRouter.route("/verify-otp").post(validate(verifyOTPValidation), verifyOtp);
authRouter
  .route("/refresh-token")
  .post(validate(refreshTokenValidation), refreshTokenRotation);
authRouter
  .route("/logout")
  .post(protectedRoutes, validate(logoutValidation), logout);

export default authRouter;
