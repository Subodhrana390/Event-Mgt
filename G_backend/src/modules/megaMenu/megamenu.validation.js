import Joi from "joi";

// Schema for a menu item
const menuItemSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  url: Joi.string().required(),
});

// Schema for a column
const columnSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  items: Joi.array().items(menuItemSchema),
});

// Schema for a mega menu item
const megaMenuItemSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  url: Joi.string().required(),
  columns: Joi.array().items(columnSchema),
});

// Schema for a mega menu
const megaMenuSchema = Joi.object({
  name: Joi.string().required(),
  items: Joi.array().items(megaMenuItemSchema),
});

// Schema for adding an item to a mega menu
const addItemSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  url: Joi.string().required(),
  columns: Joi.array().items(columnSchema),
});

// Schema for adding a column to a mega menu item
const addColumnSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  items: Joi.array().items(menuItemSchema),
});

// Schema for adding a sub-item to a column
const addSubItemSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  url: Joi.string().required(),
});

// Schema for adding a sub-item to a column
const updateSubItemSchema = Joi.object({
  title: Joi.string().optional(),
  url: Joi.string().optional(),
}).or("title", "url");

export {
  megaMenuSchema,
  addItemSchema,
  addColumnSchema,
  addSubItemSchema,
  updateSubItemSchema,
};
