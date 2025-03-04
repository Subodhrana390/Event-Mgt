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
 *     description: Returns an array of user objects
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get("/", protectedRoutes, allowedTo("admin"), getAllUsers);

/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     description: Returns user profile details
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile details
 */
userRouter.get("/profile", protectedRoutes, getUserProfile);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve details of a specific user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details
 */
userRouter.get("/:id", protectedRoutes, getUserById);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     description: Allows admin to create a new user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
 *     description: Update an existing user's details
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 */
userRouter.put("/:id", validate(updateUserSchema), protectedRoutes, updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Allows admin to delete a user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
userRouter.delete("/:id", protectedRoutes, allowedTo("admin"), deleteUser);

export default userRouter;