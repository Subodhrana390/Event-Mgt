import Joi from "joi";

const createSubCategorySchema= Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Name should be a string.",
    "string.min": "Name should be at least 2 characters long.",
    "string.max": "Name should not exceed 50 characters.",
    "any.required": "Name is required.",
  }),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid category ID format.",
      "any.required": "Category ID is required.",
    }),
  description: Joi.string().min(2).max(50).required().messages({
    "string.base": "Name should be a string.",
    "string.min": "Name should be at least 2 characters long.",
    "string.max": "Name should not exceed 50 characters.",
    "any.required": "Name is required.",
  }),
});

export { createSubCategorySchema };
