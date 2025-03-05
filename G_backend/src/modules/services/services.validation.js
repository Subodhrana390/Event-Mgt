import Joi from "joi";

// Validation schema for creating a service
const createServiceSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
  }),
  seller: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "any.required": "Seller ID is required",
      "string.pattern.base": "Invalid Seller ID",
    }),
  category: Joi.string().required().messages({
    "any.required": "Category is required",
    "string.empty": "Category cannot be empty",
  }),
  subCategory: Joi.string().required().messages({
    "any.required": "Sub-category is required",
    "string.empty": "Sub-category cannot be empty",
  }),
  eventType: Joi.array().items(Joi.string()).min(1).required().messages({
    "any.required": "Event type is required",
    "array.min": "At least one event type is required",
  }),
  packages: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required().messages({
          "any.required": "Package type is required",
          "string.empty": "Package type cannot be empty",
        }),
        title: Joi.string().required().messages({
          "any.required": "Package title is required",
          "string.empty": "Package title cannot be empty",
        }),
        description: Joi.string().max(50).required().messages({
          "any.required": "Package description is required",
          "string.empty": "Package description cannot be empty",
          "string.max": "Package description cannot exceed 50 characters",
        }),
        features: Joi.array().items(Joi.string()).min(1).required().messages({
          "any.required": "Package features are required",
          "array.min": "At least one feature is required",
        }),
        price: Joi.number().positive().required().messages({
          "any.required": "Package price is required",
          "number.base": "Price must be a number",
          "number.positive": "Price must be a positive number",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "any.required": "Packages are required",
      "array.min": "At least one package is required",
    }),
  tags: Joi.array().items(Joi.string()).optional(),
});

// Validation schema for updating a service
const updateServiceSchema = Joi.object({
  title: Joi.string().optional().messages({
    "string.empty": "Title cannot be empty",
  }),
  description: Joi.string().optional().messages({
    "string.empty": "Description cannot be empty",
  }),
  category: Joi.string().optional().messages({
    "string.empty": "Category cannot be empty",
  }),
  subCategory: Joi.string().optional().messages({
    "string.empty": "Sub-category cannot be empty",
  }),
  eventType: Joi.array().items(Joi.string()).min(1).optional().messages({
    "array.min": "At least one event type is required",
  }),
  packages: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required().messages({
          "any.required": "Package type is required",
          "string.empty": "Package type cannot be empty",
        }),
        title: Joi.string().required().messages({
          "any.required": "Package title is required",
          "string.empty": "Package title cannot be empty",
        }),
        description: Joi.string().max(50).required().messages({
          "any.required": "Package description is required",
          "string.empty": "Package description cannot be empty",
          "string.max": "Package description cannot exceed 50 characters",
        }),
        features: Joi.array().items(Joi.string()).min(1).required().messages({
          "any.required": "Package features are required",
          "array.min": "At least one feature is required",
        }),
        price: Joi.number().positive().required().messages({
          "any.required": "Package price is required",
          "number.base": "Price must be a number",
          "number.positive": "Price must be a positive number",
        }),
      })
    )
    .min(1)
    .optional()
    .messages({
      "array.min": "At least one package is required",
    }),
  tags: Joi.array().items(Joi.string()).optional(),
});

// Validation schema for booking a date
const bookDateSchema = Joi.object({
  bookedDate: Joi.date().iso().required().messages({
    "any.required": "Booked date is required",
    "date.base": "Invalid date format",
    "date.iso": "Date must be in ISO format (YYYY-MM-DD)",
  }),
});

const getServiceByIdSchema = Joi.object({
  id: Joi.objectId().required().messages({
    "any.required": "Service ID is required",
    "string.empty": "Service ID cannot be empty",
    "string.pattern.base": "Invalid service ID format", // Corrected the pattern message
  }),
});

export { createServiceSchema, updateServiceSchema, bookDateSchema ,getServiceByIdSchema};
