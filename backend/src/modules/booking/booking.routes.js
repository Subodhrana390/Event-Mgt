/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - user
 *         - service
 *         - date
 *         - amount
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the booking
 *         user:
 *           type: string
 *           description: The ID of the user who made the booking
 *         service:
 *           type: string
 *           description: The ID of the booked service
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the booking
 *         amount:
 *           type: number
 *           description: The total amount paid for the booking
 *         paymentStatus:
 *           type: string
 *           enum: [pending, completed, failed, cancelled]
 *           description: The status of the payment
 *         serviceStatus:
 *           type: string
 *           enum: [pending, completed]
 *           description: The status of the booked service
 *         razorpayOrderId:
 *           type: string
 *           description: Razorpay order ID
 *         razorpayPaymentId:
 *           type: string
 *           description: Razorpay payment ID
 *         razorpaySignature:
 *           type: string
 *           description: Razorpay payment signature
 *         refundId:
 *           type: string
 *           description: Razorpay refund ID
 *         refundStatus:
 *           type: string
 *           description: Status of the refund
 *       example:
 *         id: "60d0fe4f5311236168a109ca"
 *         user: "60d0fe4f5311236168a109cb"
 *         service: "60d0fe4f5311236168a109cc"
 *         date: "2025-03-10T00:00:00.000Z"
 *         amount: 1000
 *         paymentStatus: "completed"
 *         serviceStatus: "pending"
 *         razorpayOrderId: "order_H5gPFL5tR7b6GZ"
 *         razorpayPaymentId: "pay_H5gPGxGxGxGxGx"
 *         razorpaySignature: "abcdef1234567890"
 *         refundId: "rfnd_H5gPXyz"
 *         refundStatus: "processed"
 */

import express from "express";
import {
  cancelBooking,
  confirmPayment,
  createBooking,
  getUserBookings,
  markServiceAsCompleted,
} from "./booking.controller.js";
import {
  createBookingSchema,
  confirmPaymentSchema,
} from "./booking.validation.js";
import { validate } from "../../middlewares/validate.js";

const bookingRouter = express.Router();

/**
 * @swagger
 * /api/v1/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 */
bookingRouter.post("/", validate(createBookingSchema), createBooking);

/**
 * @swagger
 * /api/v1/bookings/confirm-payment:
 *   post:
 *     summary: Confirm payment for a booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpayOrderId:
 *                 type: string
 *               razorpayPaymentId:
 *                 type: string
 *               razorpaySignature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment confirmed successfully
 */
bookingRouter.post(
  "/confirm-payment",
  validate(confirmPaymentSchema),
  confirmPayment
);

/**
 * @swagger
 * /api/v1/bookings/user/{userId}:
 *   get:
 *     summary: Get all bookings for a user
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of bookings for the user
 */
bookingRouter.get("/user/:userId", getUserBookings);

/**
 * @swagger
 * /api/v1/bookings/{bookingId}/cancel:
 *   post:
 *     summary: Cancel a booking and initiate a refund
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booking
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 */
bookingRouter.post(":/bookingId/cancel", cancelBooking);

/**
 * @swagger
 * /api/v1/bookings/{bookingId}/complete:
 *   patch:
 *     summary: Mark a service as completed
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booking
 *     responses:
 *       200:
 *         description: Service marked as completed
 */
bookingRouter.patch("/bookings/:bookingId/complete", markServiceAsCompleted);

export default bookingRouter;