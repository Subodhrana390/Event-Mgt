import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
} from "./subcategory.controller.js";
import {
  createSubCategorySchema,
  updateSubCategorySchema,
  validateMongoId,
} from "./subcategory.validation.js";
import { validate } from "../../middlewares/validate.js";
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js";

const subCategoryRouter = Router();

subCategoryRouter.post(
  "/",
  protectedRoutes,
  allowedTo("admin"),
  validate(createSubCategorySchema),
  createSubCategory
);
subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.get("/:id", validate(validateMongoId), getSubCategoryById);
subCategoryRouter.put(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  validate(validateMongoId),
  validate(updateSubCategorySchema),
  updateSubCategory
);
subCategoryRouter.delete(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  validate(validateMongoId),
  deleteSubCategory
);

export default subCategoryRouter;

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
 *     description: Allows admins to create a new subcategory under an existing category
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Smartphones"
 *                 description: "Name of the subcategory"
 *               description:
 *                 type: string
 *                 example: "Subcategory for mobile phones and accessories"
 *                 description: "Detailed description of the subcategory"
 *               category:
 *                 type: string
 *                 example: "67cc0202ba091653febd0e30"
 *                 description: "The ID of the parent category"
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "7b2a1f4e3c7d5a9e8b6c0f1d"
 *                     name:
 *                       type: string
 *                       example: "Smartphones"
 *                     description:
 *                       type: string
 *                       example: "Subcategory for mobile phones and accessories"
 *                     category:
 *                       type: string
 *                       example: "67cc0202ba091653febd0e30"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T10:15:30.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T10:15:30.000Z"
 *                 message:
 *                   type: string
 *                   example: "Subcategory created successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Missing required fields or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid request data. Name and category are required."
 *       401:
 *         description: Unauthorized - Token not provided or insufficient permissions
 *       403:
 *         description: Forbidden - User does not have permission to create a subcategory
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/subcategories:
 *   get:
 *     summary: Retrieve all subcategories
 *     tags: [SubCategories]
 *     responses:
 *       200:
 *         description: A list of subcategories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67ba0dd9dce6e4d14af441a9"
 *                       name:
 *                         type: string
 *                         example: "Event Photographers"
 *                       category:
 *                         type: string
 *                         example: "67cbed9795d8c1bef84749ee"
 *                       description:
 *                         type: string
 *                         example: "Coverage for weddings, concerts, and corporate events."
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-22T17:37:48.302Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-22T17:37:48.302Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 *                 message:
 *                   type: string
 *                   example: "Subcategories retrieved successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: No subcategories found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "No subcategories found."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67ba0dd9dce6e4d14af441a9"
 *                     name:
 *                       type: string
 *                       example: "Event Photographers"
 *                     category:
 *                       type: string
 *                       example: "67cbed9795d8c1bef84749ee"
 *                     description:
 *                       type: string
 *                       example: "Coverage for weddings, concerts, and corporate events."
 *                 message:
 *                   type: string
 *                   example: "Subcategory retrieved successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Subcategory not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Subcategory not found."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Event Photographers"
 *               category:
 *                 type: string
 *                 example: "67cbed9795d8c1bef84749ee"
 *               description:
 *                 type: string
 *                 example: "Coverage for weddings, concerts, and corporate events."
 *     responses:
 *       200:
 *         description: The updated subcategory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67ba0dd9dce6e4d14af441a9"
 *                     name:
 *                       type: string
 *                       example: "Event Photographers"
 *                     category:
 *                       type: string
 *                       example: "67cbed9795d8c1bef84749ee"
 *                     description:
 *                       type: string
 *                       example: "Coverage for weddings, concerts, and corporate events."
 *                 message:
 *                   type: string
 *                   example: "Subcategory updated successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid request data."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized. Please log in."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       403:
 *         description: Forbidden - User does not have permission to update the subcategory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "Forbidden. You do not have permission to update this subcategory."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Subcategory not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Subcategory not found."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /api/v1/subcategories/{id}:
 *   delete:
 *     summary: Delete a subcategory
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
 *         description: Subcategory deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data: null
 *               message: "Subcategory deleted successfully"
 *               success: true
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 401
 *               message: "Unauthorized - Please log in"
 *               success: false
 *       403:
 *         description: Forbidden - User lacks permission to delete this subcategory
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 403
 *               message: "Forbidden - You do not have permission to delete this subcategory"
 *               success: false
 *       404:
 *         description: Subcategory not found
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 404
 *               message: "Subcategory not found"
 *               success: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: "Internal server error"
 *               success: false
 */
