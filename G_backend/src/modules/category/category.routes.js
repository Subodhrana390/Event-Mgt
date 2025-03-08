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
import { uploadSingleFile } from "../../../multer/multer.js";

const categoryRouter = Router();

categoryRouter.post(
  "/",
  protectedRoutes,
  allowedTo("admin"),
  uploadSingleFile("icon", "category"),
  validate(addCategorySchema),
  createCategory
);

categoryRouter.get("/", getAllCategories);

categoryRouter.get(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  getCategoryById
);

categoryRouter.put(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  uploadSingleFile("icon", "category"),
  validate(updateCategorySchema),
  updateCategory
);

categoryRouter.delete(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  deleteCategory
);

export default categoryRouter;

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
 *
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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *               icon:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *                 example: "Category for electronic items"
 *     responses:
 *       201:
 *         description: Category created successfully
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
 *                     name:
 *                       type: string
 *                       example: "Electronics"
 *                     icon:
 *                       type: string
 *                       example: "723124e9-5b7b-43ab-991f-aec8b2ff3db5-camera.jpeg"
 *                     description:
 *                       type: string
 *                       example: "Category for electronic items"
 *                     subcategories:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     _id:
 *                       type: string
 *                       example: "67cc0202ba091653febd0e30"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T08:38:26.491Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T08:38:26.491Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 message:
 *                   type: string
 *                   example: "Category created successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Missing required fields or invalid input
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
 *                   example: "Invalid request data. Name is required."
 *                 stack:
 *                   type: string
 *                   example: "Error: Name field is required\n    at controller.js:56:12"
 *       401:
 *         description: Unauthorized - Token not provided or invalid
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
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access - Admin role required"
 *                 stack:
 *                   type: string
 *                   example: "Error: Token missing or invalid\n"
 *       403:
 *         description: Forbidden - User does not have permission to create a category
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
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "Access denied. You do not have permission to create a category."
 *                 stack:
 *                   type: string
 *                   example: "Error: Access denied\n    at middleware.js:30:10"
 *       500:
 *         description: Internal server error
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
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error. Please try again later."
 *                 stack:
 *                   type: string
 *                   example: "Error: Something went wrong\n    at server.js:78:15"
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     description: Returns an array of category objects with pagination
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
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
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "67cbed9795d8c1bef84749ee"
 *                           name:
 *                             type: string
 *                             example: "Photography"
 *                           icon:
 *                             type: string
 *                             example: "http://localhost:3000/category/988e963c-79d0-4861-afc5-21efb3c884ff-camera.jpeg"
 *                           description:
 *                             type: string
 *                             example: "Product Photographers, Portrait Photographers"
 *                           subcategories:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example:
 *                               - "67ba0dd9dce6e4d14af441a9"
 *                               - "67ba0b6cdd9fc1483a754605"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-03-08T08:38:26.491Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-03-08T08:38:26.491Z"
 *                           __v:
 *                             type: integer
 *                             example: 0
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         total:
 *                           type: integer
 *                           example: 2
 *                         totalPages:
 *                           type: integer
 *                           example: 1
 *                 message:
 *                   type: string
 *                   example: "Category retrieved successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     description: Retrieve a specific category by its ID
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
 *         description: Category retrieved successfully
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
 *                       example: "67cc0202ba091653febd0e30"
 *                     name:
 *                       type: string
 *                       example: "Electronics"
 *                     icon:
 *                       type: string
 *                       example: "http://localhost:3000/category/723124e9-5b7b-43ab-991f-aec8b2ff3db5-camera.jpeg"
 *                     description:
 *                       type: string
 *                       example: "Category for electronic items"
 *                     subcategories:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T08:38:26.491Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T08:38:26.491Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 message:
 *                   type: string
 *                   example: "Category retrieved successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Invalid ID format
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Update category details
 *     description: Update an existing category's details, including name, description, and icon
 *     tags: [Categories]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Category Name"
 *               description:
 *                 type: string
 *                 example: "Updated description of the category"
 *               icon:
 *                 type: string
 *                 format: binary
 *                 description: "Upload category icon image"
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                       example: "67cc0202ba091653febd0e30"
 *                     name:
 *                       type: string
 *                       example: "Updated Electronics"
 *                     icon:
 *                       type: string
 *                       example: "http://localhost:3000/category/updated-icon.jpeg"
 *                     description:
 *                       type: string
 *                       example: "Updated category for electronic items"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T09:30:00.000Z"
 *                 message:
 *                   type: string
 *                   example: "Category updated successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Invalid input data
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
 *                   example: "Invalid request data. Check input values."
 *                 stack:
 *                   type: string
 *                   example: "Error: Invalid request data\n    at file.js:45:12"
 *       401:
 *         description: Unauthorized - Token not provided
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
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Token was not provided!"
 *                 stack:
 *                   type: string
 *                   example: "Error: Token was not provided!\n"
 *       403:
 *         description: Forbidden - User does not have permission to update the category
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
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to access this route. Your role is seller"
 *                 stack:
 *                   type: string
 *                   example: "Error: You are not authorized to access this route. Your role is seller\n"
 *       404:
 *         description: Category not found
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
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Category not found."
 *                 stack:
 *                   type: string
 *                   example: "Error: Category not found.\n"
 *       500:
 *         description: Internal server error
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
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 stack:
 *                   type: string
 *                   example: "Error: Something went wrong!\n    at server.js:120:15"
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Allows admin to delete a category by ID
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
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: "null"
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: "category deleted successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized - Token not provided or insufficient permissions
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
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Token was not provided!"
 *                 stack:
 *                   type: string
 *                   example: "Error: Token was not provided!\n"
 *       403:
 *         description: Forbidden - User does not have permission to delete the category
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
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to access this route. Your role is seller"
 *                 stack:
 *                   type: string
 *                   example: "Error: You are not authorized to access this route. Your role is seller\n    at file:///D:/Recent_Projects/Event-Mgt/G_backend/src/modules/auth/auth.controller.js:263:9\n    at file:///D:/Recent_Projects/Event-Mgt/G_backend/src/utils/asyncHandler.js:3:5\n    at Layer.handle [as handle_request] (D:\\Recent_Projects\\Event-Mgt\\G_backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (D:\\Recent_Projects\\Event-Mgt\\G_backend\\node_modules\\express\\lib\\router\\route.js:149:13)\n    at file:///D:/Recent_Projects/Event-Mgt/G_backend/src/modules/auth/auth.controller.js:246:5\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)"
 *       404:
 *         description: Category not found
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
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Category not found."
 *                 stack:
 *                   type: string
 *                   example: "Error: Category not found.\n    at file:///D:/Recent_Projects/Event-Mgt/G_backend/src/modules/category/category.controller.js:103:11\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)"
 */
