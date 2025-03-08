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

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management API
 *
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the category
 *         name:
 *           type: string
 *           description: Category name (unique and required)
 *         icon:
 *           type: string
 *           description: URL of the category icon
 *         description:
 *           type: string
 *           description: Category description
 *         subcategories:
 *           type: array
 *           items:
 *             type: string
 *           description: List of subcategory IDs
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the category was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the category was last updated
 */

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     description: Allows admin to create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 */
categoryRouter.post(
  "/",
  uploadSingleFile("icon", "category"),
  validate(addCategorySchema),
  createCategory
);

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     description: Returns an array of category objects
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
categoryRouter.get("/", getAllCategories);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     description: Retrieve details of a specific category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category details
 */
categoryRouter.get("/:id", getCategoryById);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Update category details
 *     description: Update an existing category's details
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
categoryRouter.put(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  uploadSingleFile("icon", "category"),
  validate(addCategorySchema),
  validate(updateCategorySchema),
  updateCategory
);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Allows admin to delete a category by ID
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
categoryRouter.delete(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  validate(addCategorySchema),
  deleteCategory
);

export default categoryRouter;
