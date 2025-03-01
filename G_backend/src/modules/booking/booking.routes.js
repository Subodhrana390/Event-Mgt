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

// Create a booking and initiate payment
bookingRouter.post("/", validate(createBookingSchema), createBooking);

// Confirm payment and update booking status
bookingRouter.post(
  "/confirm-payment",
  validate(confirmPaymentSchema),
  confirmPayment
);

// Get all bookings for a user
bookingRouter.get("/user/:userId", getUserBookings);
// Cancel a booking and initiate refund
bookingRouter.post("/:bookingId/cancel",cancelBooking );

// Seller marks the service as completed
bookingRouter.patch(
  "/bookings/:bookingId/complete",
  markServiceAsCompleted
);

export default bookingRouter;
