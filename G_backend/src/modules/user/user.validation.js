import Joi from "joi";

const createUserSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "any.required": "Phone number is required",
      "string.pattern.base": "Phone number must be a 10-digit number",
    }),
  name: Joi.string().optional().messages({
    "string.empty": "Name cannot be empty",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Email must be a valid email address",
  }),
  address: Joi.string().optional().messages({
    "string.empty": "Address cannot be empty",
  }),
  city: Joi.string().optional().messages({
    "string.empty": "City cannot be empty",
  }),
  state: Joi.string().optional().messages({
    "string.empty": "State cannot be empty",
  }),
  zip: Joi.string()
    .pattern(/^[0-9]{5}(?:-[0-9]{4})?$/)
    .optional()
    .messages({
      "string.pattern.base": "ZIP code must be a valid US ZIP code",
    }),
  country: Joi.string().optional().messages({
    "string.empty": "Country cannot be empty",
  }),
  status: Joi.string().valid("active", "inactive").default("active").messages({
    "any.only": "Status must be either 'active' or 'inactive'",
  }),
  role: Joi.string()
    .valid("customer", "seller", "admin")
    .default("customer")
    .messages({
      "any.only": "Role must be either 'customer', 'seller', or 'admin'",
    }),
});

const updateUserSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional()
    .messages({
      "string.pattern.base": "Phone number must be a 10-digit number",
    }),
  name: Joi.string().optional().messages({
    "string.empty": "Name cannot be empty",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Email must be a valid email address",
  }),
  address: Joi.string().optional().messages({
    "string.empty": "Address cannot be empty",
  }),
  city: Joi.string().optional().messages({
    "string.empty": "City cannot be empty",
  }),
  state: Joi.string().optional().messages({
    "string.empty": "State cannot be empty",
  }),
  zip: Joi.string()
    .pattern(/^[0-9]{5}(?:-[0-9]{4})?$/)
    .optional()
    .messages({
      "string.pattern.base": "ZIP code must be a valid US ZIP code",
    }),
  country: Joi.string().optional().messages({
    "string.empty": "Country cannot be empty",
  }),
  status: Joi.string().valid("active", "inactive").optional().messages({
    "any.only": "Status must be either 'active' or 'inactive'",
  }),
  role: Joi.string().valid("customer", "seller", "admin").optional().messages({
    "any.only": "Role must be either 'customer', 'seller', or 'admin'",
  }),
});

export { createUserSchema, updateUserSchema };
