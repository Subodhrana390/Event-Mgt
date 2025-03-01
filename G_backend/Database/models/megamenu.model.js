import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Unique identifier for the item
  title: { type: String, required: true }, // Display text for the item
  url: { type: String, required: true }, // URL for navigation
});

const columnSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Unique identifier for the column
  title: { type: String, required: true }, // Title of the column
  items: [menuItemSchema], // Array of sub-items in the column
});

const megaMenuItemSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Unique identifier for the top-level item
  title: { type: String, required: true }, // Display text for the top-level item
  url: { type: String, required: true }, // URL for navigation
  columns: [columnSchema], // Array of columns in the mega menu item
});

const megaMenuSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the menu (e.g., "Main Menu")
  items: [megaMenuItemSchema], // Array of top-level menu items
});

// Create the model
export const MegaMenuModel = mongoose.model("MegaMenu", megaMenuSchema);
