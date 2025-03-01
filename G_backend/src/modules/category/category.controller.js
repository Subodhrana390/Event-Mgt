import { CategoryModel } from "../../../Database/models/category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import ApiResponse from "../../utils/ApiResponse.js";

// Create a new category (Admin only)
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // Check if the file is uploaded
  if (!req.file) {
    throw new AppError(400, "Category icon is required.");
  }

  const icon = req.file.filename;

  // Check if the category already exists
  const existingCategory = await CategoryModel.findOne({ name });
  if (existingCategory) {
    throw new AppError(400, "Category already exists.");
  }

  // Create the category
  const newCategory = await CategoryModel.create({ name, icon, description });

  res.status(201).json(new ApiResponse(201, newCategory, "Category created successfully"));
});

// Get all categories
const getAllCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const categories = await CategoryModel.find().skip(skip).limit(limit);

  const totalCategories = await CategoryModel.countDocuments();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        categories,
        pagination: {
          page,
          limit,
          total: totalCategories,
          totalPages: Math.ceil(totalCategories / limit),
        },
      },
      "Category retrived successfully"
    )
  );
});

// Get a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

// Update a category (Admin only)
const updateCategory = asyncHandler(async (req, res) => {
  const { name, avatar, description } = req.body;

  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    { name, avatar, description },
    { new: true }
  );

  if (!updatedCategory) {
    throw new AppError(404, "Category not found.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "category updated successfully")
    );
});

// Delete a category (Admin only)
const deleteCategory = asyncHandler(async (req, res) => {
  const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);

  if (!deletedCategory) {
    throw new AppError(404, "Category not found.");
  }
  res
    .status(200)
    .json(new ApiResponse(200, null, "category deleted successfully"));
});

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
