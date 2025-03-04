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

/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategories:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the subcategory
 *         name:
 *           type: string
 *           description: The name of the subcategory
 *         category:
 *           type: string
 *           description: The category ID this subcategory belongs to
 *         description:
 *           type: string
 *           description: A brief description of the subcategory
 *       example:
 *         id: "60d0fe4f5311236168a109ca"
 *         name: "Laptops"
 *         category: "60d0fe4f5311236168a109cb"
 *         description: "Subcategory for all laptop products"
 */

/**
 * @swagger
 * /api/v1/subcategories:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       201:
 *         description: The created subcategory
 *       400:
 *         description: Bad request
 */
subCategoryRouter.post("/", validate(createSubCategorySchema), createSubCategory);

/**
 * @swagger
 * /api/v1/subcategories:
 *   get:
 *     summary: Retrieve all subcategories
 *     tags: [SubCategories]
 *     responses:
 *       200:
 *         description: A list of subcategories.
 */
subCategoryRouter.get("/", getAllSubCategories);

/**
 * @swagger
 * /api/v1/subcategories/{id}:
 *   get:
 *     summary: Get a subcategory by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory ID
 *     responses:
 *       200:
 *         description: The subcategory data
 *       404:
 *         description: Subcategory not found
 */
subCategoryRouter.get("/:id", getSubCategoryById);

/**
 * @swagger
 * /api/v1/subcategories/{id}:
 *   put:
 *     summary: Update a subcategory by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       200:
 *         description: The updated subcategory
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subcategory not found
 */
subCategoryRouter.put("/:id", updateSubCategory);

/**
 * @swagger
 * /api/v1/subcategories/{categoryId}/{subcategoryId}:
 *   delete:
 *     summary: Delete a subcategory
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *       - in: path
 *         name: subcategoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory ID
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *       404:
 *         description: Subcategory not found
 */
subCategoryRouter.delete("/:categoryId/:subcategoryId", deleteSubCategory);

export default subCategoryRouter;
