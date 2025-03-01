import { BookingModel } from "../../../Database/models/booking.model.js";
import { ServicesModel } from "../../../Database/models/services.model.js";
import razorpay from "../../../config/razorpay.config.js";
import crypto from "crypto";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { AppError } from "../../utils/AppError.js";

// Create a Razorpay order for payment
const createRazorpayOrder = async (amount) => {
  const options = {
    amount: amount * 100, // Amount in paise (e.g., 100 INR = 10000 paise)
    currency: "INR",
    receipt: `receipt_${Date.now()}`, // Unique receipt ID
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw new AppError("Failed to create Razorpay order", 500);
  }
};

// Initiate a refund using Razorpay
const initiateRefund = async (paymentId, amount) => {
  try {
    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount * 100, // Amount in paise (e.g., 100 INR = 10000 paise)
    });
    return refund;
  } catch (error) {
    throw new AppError("Failed to initiate refund: " + error.message, 500);
  }
};

// Create a booking and initiate payment
const createBooking = asyncHandler(async (req, res, next) => {
  const { serviceId, date, amount } = req.body;

  // Check if the service exists
  const serviceDetails = await ServicesModel.findById(serviceId);
  if (!serviceDetails) {
    return next(new AppError("Service not found", 404));
  }

  // Check if the requested date is available for the service
  const isDateAvailable = serviceDetails.availableDates.some(
    (availableDate) => availableDate.toISOString().split("T")[0] === date
  );

  if (!isDateAvailable) {
    return next(
      new AppError("The service is not available on the selected date.", 400)
    );
  }

  // Check if the service is already booked for the given date
  const existingBooking = await BookingModel.findOne({
    service,
    date,
    paymentStatus: { $ne: "failed" }, // Exclude failed payments
  });

  if (existingBooking) {
    return next(
      new AppError("This service is already booked for the selected date.", 400)
    );
  }

  // Create a Razorpay order
  const razorpayOrder = await createRazorpayOrder(amount);

  // Save the booking with payment status as "pending"
  const newBooking = await BookingModel.create({
    user,
    service,
    date,
    amount,
    razorpayOrderId: razorpayOrder.id,
  });

  res.status(201).json(
    new ApiResponse(
      201,
      {
        booking: newBooking,
        razorpayOrder,
      },
      "Booking created successfully. Proceed to payment."
    )
  );
});

// Confirm payment and update booking status
const confirmPayment = asyncHandler(async (req, res, next) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  // Verify the payment signature
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (generatedSignature !== razorpaySignature) {
    return next(new AppError("Invalid payment signature", 400));
  }

  // Update the booking status to "completed"
  const updatedBooking = await BookingModel.findOneAndUpdate(
    { razorpayOrderId },
    {
      paymentStatus: "completed",
      razorpayPaymentId,
      razorpaySignature,
    },
    { new: true }
  );

  if (!updatedBooking) {
    return next(new AppError("Booking not found", 404));
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedBooking,
        "Payment confirmed and booking completed."
      )
    );
});

// Get all bookings for a user
const getUserBookings = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const bookings = await BookingModel.find({ user: userId })
    .populate("user")
    .populate("service");

  res
    .status(200)
    .json(
      new ApiResponse(200, bookings, "User bookings retrieved successfully")
    );
});

// Cancel a booking and initiate refund
const cancelBooking = asyncHandler(async (req, res, next) => {
  const { bookingId } = req.params;

  // Find the booking
  const booking = await BookingModel.findById(bookingId);
  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  // Check if the booking is already cancelled
  if (booking.paymentStatus === "cancelled") {
    return next(new AppError("Booking is already cancelled", 400));
  }

  // Check if the payment was completed
  if (booking.paymentStatus !== "completed") {
    return next(new AppError("Cannot cancel a pending or failed booking", 400));
  }

  // Initiate refund using Razorpay
  const refund = await initiateRefund(
    booking.razorpayPaymentId,
    booking.amount
  );

  // Update the booking status to "cancelled" and save refund details
  booking.paymentStatus = "cancelled";
  booking.refundId = refund.id;
  booking.refundStatus = refund.status;
  await booking.save();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        booking,
        refund,
      },
      "Booking cancelled successfully. Refund initiated."
    )
  );
});

const markServiceAsCompleted = asyncHandler(async (req, res, next) => {
  const { bookingId } = req.params;

  // Find the booking
  const booking = await BookingModel.findById(bookingId);
  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  // Check if the payment is completed
  if (booking.paymentStatus !== "completed") {
    return next(
      new AppError("Cannot mark service as completed for unpaid bookings", 400)
    );
  }

  // Check if the service is already marked as completed
  if (booking.serviceStatus === "completed") {
    return next(new AppError("Service is already marked as completed", 400));
  }

  // Update the service status to "completed"
  booking.serviceStatus = "completed";
  await booking.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, booking, "Service marked as completed successfully.")
    );
});

export {
  createBooking,
  confirmPayment,
  getUserBookings,
  cancelBooking,
  markServiceAsCompleted,
};
