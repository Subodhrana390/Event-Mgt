import { Router } from "express";
import {
  logout,
  protectedRoutes,
  refreshTokenRotation,
  sendOtp,
  verifyOtp,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  logoutValidation,
  refreshTokenValidation,
  sentOTPValidation,
  verifyOTPValidation,
} from "./auth.validation.js";

const authRouter = Router();

/**
 * @swagger
 * /api/v1/auth/send-otp:
 *   post:
 *     summary: Send OTP to user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "+911234567890"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Invalid request data
 */
authRouter.route("/send-otp").post(validate(sentOTPValidation), sendOtp);

/**
 * @swagger
 * /api/v1/auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+911234567890"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 */
authRouter.route("/verify-otp").post(validate(verifyOTPValidation), verifyOtp);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh authentication token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "your-refresh-token"
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid or expired token
 */
authRouter
  .route("/refresh-token")
  .post(validate(refreshTokenValidation), refreshTokenRotation);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */
authRouter
  .route("/logout")
  .post(protectedRoutes, validate(logoutValidation), logout);

export default authRouter;
