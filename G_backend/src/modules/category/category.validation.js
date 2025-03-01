import Joi from "joi";

// Schema for creating a category (excluding file validation)
const addCategorySchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
  }),
});

// Schema for updating a category
const updateCategorySchema = Joi.object({
  name: Joi.string().trim().messages({
    "string.empty": "Name cannot be empty",
  }),
  description: Joi.string().messages({
    "string.empty": "Description cannot be empty",
  }),
}).min(1); // Ensure at least one field is provided

export { addCategorySchema, updateCategorySchema };
