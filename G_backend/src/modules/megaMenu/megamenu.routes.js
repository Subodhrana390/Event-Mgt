import express from "express";
import {
  createMegaMenu,
  getAllMegaMenus,
  getMegaMenuById,
  updateMegaMenu,
  deleteMegaMenu,
  addItemToMegaMenu,
  removeItemFromMegaMenu,
  updateItemInMegaMenu,
  addColumnToMegaMenuItem,
  removeColumnFromMegaMenuItem,
  updateColumnInMegaMenuItem,
  addSubItemToColumn,
  removeSubItemFromColumn,
  updateSubItemInColumn,
} from "./megamenu.controller.js";
import {
  megaMenuSchema,
  addItemSchema,
  addColumnSchema,
  addSubItemSchema,
  updateSubItemSchema,
} from "./megamenu.validation.js";
import { validate } from "../../middlewares/validate.js";

const megamenuRouter = express.Router();

// Create a new Mega Menu
megamenuRouter.post("/", validate(megaMenuSchema), createMegaMenu);

// Get all Mega Menus
megamenuRouter.get("/", getAllMegaMenus);

// Get a single Mega Menu by ID
megamenuRouter.get("/:id", getMegaMenuById);

// Update a Mega Menu by ID
megamenuRouter.put("/:id", validate(megaMenuSchema), updateMegaMenu);

// Delete a Mega Menu by ID
megamenuRouter.delete("/:id", deleteMegaMenu);

// Add a new item to a Mega Menu
megamenuRouter.post("/:id/items", validate(addItemSchema), addItemToMegaMenu);

// Remove an item from a Mega Menu
megamenuRouter.delete("/:id/items/:itemId", removeItemFromMegaMenu);

// Update an item in a Mega Menu
megamenuRouter.put("/:id/items/:itemId", validate(addItemSchema), updateItemInMegaMenu);

// Add a column to a Mega Menu item
megamenuRouter.post(
  "/:id/items/:itemId/columns",
  validate(addColumnSchema),
  addColumnToMegaMenuItem
);

// Remove a column from a Mega Menu item
megamenuRouter.delete(
  "/:id/items/:itemId/columns/:columnId",
  removeColumnFromMegaMenuItem
);

// Update a column in a Mega Menu item
megamenuRouter.put(
  "/:id/items/:itemId/columns/:columnId",
  validate(addColumnSchema),
  updateColumnInMegaMenuItem
);

// Add a sub-item to a column in a Mega Menu item
megamenuRouter.post(
  "/:id/items/:itemId/columns/:columnId/items",
  validate(addSubItemSchema),
  addSubItemToColumn
);

// Remove a sub-item from a column in a Mega Menu item
megamenuRouter.delete(
  "/:id/items/:itemId/columns/:columnId/items/:subItemId",
  removeSubItemFromColumn
);

// Update a sub-item in a column in a Mega Menu item
megamenuRouter.put(
  "/:id/items/:itemId/columns/:columnId/items/:subItemId",
  updateSubItemInColumn
);

export default megamenuRouter;
