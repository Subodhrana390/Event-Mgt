import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.controller.js";
import {
  addCategorySchema,
  updateCategorySchema,
} from "./category.validation.js";
import { validate } from "../../middlewares/validate.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { uploadSingleFile } from '../../../multer/multer.js'

const categoryRouter = Router();

// Create a category (Admin only)
categoryRouter.post(
  "/",
  uploadSingleFile("icon", "category"),
  validate(addCategorySchema),
  createCategory
);

// Get all categories (with pagination)
categoryRouter.get("/", getAllCategories);

// Get a single category by ID
categoryRouter.get("/:id", getCategoryById);

// Update a category (Admin only)
categoryRouter.put(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  uploadSingleFile("icon", "category"),
  validate(addCategorySchema),
  validate(updateCategorySchema),
  updateCategory
);

// Delete a category (Admin only)
categoryRouter.delete(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  validate(addCategorySchema),
  deleteCategory
);

export default categoryRouter;
