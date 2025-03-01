import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
} from "./subcategory.controller.js";
import { createSubCategorySchema } from "./subcategory.validation.js";
import { validate } from "../../middlewares/validate.js";

const subCategoryRouter = Router();

subCategoryRouter.post(
  "/",
  validate(createSubCategorySchema),
  createSubCategory
);
subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.get("/:id", getSubCategoryById);
subCategoryRouter.put("/:id", updateSubCategory);
subCategoryRouter.delete("/:categoryId/:subcategoryId", deleteSubCategory);

export default subCategoryRouter;
