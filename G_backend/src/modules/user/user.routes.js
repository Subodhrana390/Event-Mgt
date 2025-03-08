import express from "express";
import {
  deleteUser,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  getUserProfile,
} from "./user.controller.js";
import { validate } from "../../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "./user.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the user
 *         phoneNumber:
 *           type: string
 *           description: User's phone number (unique and required)
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email
 *         address:
 *           type: string
 *           description: User's address
 *         city:
 *           type: string
 *           description: User's city
 *         state:
 *           type: string
 *           description: User's state
 *         zip:
 *           type: string
 *           description: User's zip code
 *         country:
 *           type: string
 *           description: User's country
 *         status:
 *           type: string
 *           description: Status of the user
 *         role:
 *           type: string
 *           enum: ["customer", "seller", "admin"]
 *           description: User role (default is customer)
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Returns an array of user objects. Requires authentication.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 - _id: "67c723526c7607890b25ac76"
 *                   phoneNumber: "+911234567890"
 *                   role: "admin"
 *                   createdAt: "2025-03-04T15:59:14.681Z"
 *                   updatedAt: "2025-03-04T15:59:14.681Z"
 *                   __v: 0
 *               message: "Users retrieved successfully"
 *               success: true
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 401
 *               message: "Unauthorized - Please provide a valid token"
 *               success: false
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 403
 *               message: "Forbidden - You do not have permission to access this resource"
 *               success: false
 *       404:
 *         description: No users found.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 404
 *               message: "No users found"
 *               success: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: "Internal server error"
 *               success: false
 */

userRouter.get("/", protectedRoutes, allowedTo("admin"), getAllUsers);

/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     description: Returns the authenticated user's profile details.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 _id: "67c723526c7607890b25ac76"
 *                 phoneNumber: "+911234567890"
 *                 role: "admin"
 *                 createdAt: "2025-03-04T15:59:14.681Z"
 *                 updatedAt: "2025-03-04T15:59:14.681Z"
 *               message: "User profile retrieved successfully"
 *               success: true
 *       401:
 *         description: Unauthorized - User is not authenticated.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 401
 *               message: "Unauthorized - Please log in"
 *               success: false
 *       404:
 *         description: User profile not found.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 404
 *               message: "User profile not found"
 *               success: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: "Internal server error"
 *               success: false
 */

userRouter.get("/profile", protectedRoutes, getUserProfile);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve details of a specific user by their unique ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 _id: "67c723526c7607890b25ac76"
 *                 phoneNumber: "+911234567890"
 *                 role: "user"
 *                 createdAt: "2025-03-04T15:59:14.681Z"
 *                 updatedAt: "2025-03-04T15:59:14.681Z"
 *               message: "User details retrieved successfully"
 *               success: true
 *       401:
 *         description: Unauthorized - User is not authenticated.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 401
 *               message: "Unauthorized - Please log in"
 *               success: false
 *       403:
 *         description: Forbidden - User does not have permission to access this resource.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 403
 *               message: "Forbidden - You do not have access to this user"
 *               success: false
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 404
 *               message: "User not found"
 *               success: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: "Internal server error"
 *               success: false
 */

userRouter.get("/:id", protectedRoutes, getUserById);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     description: Allows admin to create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 */
userRouter.post(
  "/",
  validate(createUserSchema),
  protectedRoutes,
  allowedTo("admin"),
  createUser
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update user details
 *     description: Update an existing user's details.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number (unique and required).
 *               name:
 *                 type: string
 *                 description: User's name.
 *               email:
 *                 type: string
 *                 description: User's email.
 *               address:
 *                 type: string
 *                 description: User's address.
 *               city:
 *                 type: string
 *                 description: User's city.
 *               state:
 *                 type: string
 *                 description: User's state.
 *               zip:
 *                 type: string
 *                 description: User's zip code.
 *               country:
 *                 type: string
 *                 description: User's country.
 *               status:
 *                 type: string
 *                 description: Status of the user.
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 _id: "67c723526c7607890b25ac76"
 *                 phoneNumber: "+911234567890"
 *                 name: "John Doe"
 *                 email: "johndoe@example.com"
 *                 address: "123 Main St"
 *                 city: "New York"
 *                 state: "NY"
 *                 zip: "10001"
 *                 country: "USA"
 *                 status: "active"
 *               message: "User updated successfully"
 *               success: true
 *       400:
 *         description: Bad request - Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 400
 *               message: "Invalid request data"
 *               success: false
 *       401:
 *         description: Unauthorized - User is not authenticated.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 401
 *               message: "Unauthorized - Please log in"
 *               success: false
 *       403:
 *         description: Forbidden - User does not have permission to update this user.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 403
 *               message: "Forbidden - You do not have access to update this user"
 *               success: false
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 404
 *               message: "User not found"
 *               success: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: "Internal server error"
 *               success: false
 */

userRouter.put("/:id", validate(updateUserSchema), protectedRoutes, updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Allows an admin to delete a user by their ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to be deleted.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data: null
 *               message: "User deleted successfully"
 *               success: true
 *       401:
 *         description: Unauthorized - User is not authenticated.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 401
 *               message: "Unauthorized - Please log in"
 *               success: false
 *       403:
 *         description: Forbidden - User does not have permission to delete this user.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 403
 *               message: "Forbidden - You do not have permission to delete this user"
 *               success: false
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 404
 *               message: "User not found"
 *               success: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: "Internal server error"
 *               success: false
 */

userRouter.delete("/:id", protectedRoutes, allowedTo("admin"), deleteUser);

export default userRouter;