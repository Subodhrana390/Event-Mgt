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

// Get all users
userRouter.get("/", protectedRoutes, allowedTo("admin"), getAllUsers);
userRouter.get("/profile", protectedRoutes, getUserProfile);

// Get a single user by ID
userRouter.get("/:id", protectedRoutes, getUserById);

// Create a new user
userRouter.post(
  "/",
  validate(createUserSchema),
  protectedRoutes,
  allowedTo("admin"),
  createUser
);

// Update a user by ID
userRouter.put("/:id", validate(updateUserSchema),protectedRoutes, updateUser);

// Delete a user by ID
userRouter.delete("/:id",protectedRoutes,allowedTo("admin"), deleteUser);

export default userRouter;
