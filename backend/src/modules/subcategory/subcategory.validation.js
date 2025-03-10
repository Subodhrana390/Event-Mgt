import Joi from "joi";

const createSubCategorySchema = Joi.object({
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

const updateSubCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).messages({
    "string.base": "Name should be a string.",
    "string.min": "Name should be at least 2 characters long.",
    "string.max": "Name should not exceed 50 characters.",
  }),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": "Invalid category ID format.",
    }),
  description: Joi.string().min(1).max(100).messages({
    "string.base": "Description should be a string.",
    "string.min": "Description should be at least 1 character long.",
    "string.max": "Description should not exceed 100 characters.",
  }),
}).min(1);

const validateMongoId = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid subcategory ID format.",
      "any.required": "Subcategory ID is required.",
    }),
});

export { createSubCategorySchema, updateSubCategorySchema, validateMongoId };
