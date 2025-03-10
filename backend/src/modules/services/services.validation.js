import Joi from "joi";
const createServiceSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  subcategory: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  eventType: Joi.string().required(),
  packages: Joi.string().required(),
  tags: Joi.string().optional(),
  images: Joi.alternatives()
    .try(Joi.array().items(Joi.any()), Joi.any())
    .optional(),
  video: Joi.any().optional(),
});

const validateMongoId = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid ID format.",
      "any.required": "ID is required.",
    }),
});

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
  eventType: Joi.string().optional(),
  packages: Joi.string().optional(),
  tags: Joi.string().optional(),
  images: Joi.alternatives()
    .try(Joi.array().items(Joi.any()), Joi.any())
    .optional(),
  video: Joi.any().optional(),
});


export {
  createServiceSchema,
  updateServiceSchema,
  validateMongoId,
};
