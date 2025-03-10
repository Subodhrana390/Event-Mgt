import Joi from "joi";

// Validation schema for creating a booking
const createBookingSchema = Joi.object({
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Validate MongoDB ObjectId
    .required()
    .messages({
      "any.required": "User ID is required",
      "string.pattern.base": "Invalid User ID",
    }),
  service: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Validate MongoDB ObjectId
    .required()
    .messages({
      "any.required": "Service ID is required",
      "string.pattern.base": "Invalid Service ID",
    }),
  date: Joi.date().iso().required().messages({
    "any.required": "Date is required",
    "date.base": "Invalid date format",
    "date.iso": "Date must be in ISO format (YYYY-MM-DD)",
  }),
  amount: Joi.number().positive().required().messages({
    "any.required": "Amount is required",
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be a positive number",
  }),
});

// Validation schema for confirming payment
const confirmPaymentSchema = Joi.object({
  razorpayOrderId: Joi.string().required().messages({
    "any.required": "Razorpay Order ID is required",
  }),
  razorpayPaymentId: Joi.string().required().messages({
    "any.required": "Razorpay Payment ID is required",
  }),
  razorpaySignature: Joi.string().required().messages({
    "any.required": "Razorpay Signature is required",
  }),
});

export { createBookingSchema, confirmPaymentSchema };
