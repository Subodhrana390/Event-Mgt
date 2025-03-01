import { UserModel } from "../../../Database/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { AppError } from "../../utils/AppError.js";

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find();
  res
    .status(200)
    .json(new ApiResponse(200, users, "Users retrieved successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  res
    .status(200)
    .json(new ApiResponse(200, user, "Users retrieved successfully"));
});

// Get a single user by ID
const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res
    .status(200)
    .json(new ApiResponse(200, user, "User retrieved successfully"));
});

// Create a new user
const createUser = asyncHandler(async (req, res, next) => {
  const { phoneNumber } = req.body;

  // Check if the phone number already exists
  const existingUser = await UserModel.findOne({ phoneNumber });
  if (existingUser) {
    return next(new AppError("Phone number already exists", 400));
  }

  const newUser = await UserModel.create(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, newUser, "User created successfully"));
});

// Update a user by ID
const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  // Check if the phone number is being updated and if it already exists
  if (updateData.phoneNumber) {
    const existingUser = await UserModel.findOne({
      phoneNumber: updateData.phoneNumber,
    });
    if (existingUser && existingUser._id.toString() !== id) {
      return next(new AppError("Phone number already exists", 400));
    }
  }

  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true, // Ensure validators are run on update
  });

  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

// Delete a user by ID
const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedUser = await UserModel.findByIdAndDelete(id);
  if (!deletedUser) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});

export {
  getAllUsers,
  getUserById,
  getUserProfile,
  createUser,
  updateUser,
  deleteUser,
};
