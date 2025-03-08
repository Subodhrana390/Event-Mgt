import { SubcategoryModel } from "../../../Database/models/subcategory.model.js";
import { CategoryModel } from "../../../Database/models/category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const addSubcategoryToCategory = async (categoryId, subcategoryId) => {
  await CategoryModel.findByIdAndUpdate(
    categoryId,
    { $push: { subcategories: subcategoryId } },
    { new: true }
  );
};

const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category, description } = req.body;

  // Check if the subcategory already exists
  const existingSubcategory = await SubcategoryModel.findOne({ name });
  if (existingSubcategory) {
    throw new AppError(400, "Subcategory already exists.");
  }

  // Create the subcategory
  const newSubcategory = await SubcategoryModel.create({
    name,
    category,
    description,
  });

  await addSubcategoryToCategory(category, newSubcategory._id);

  res
    .status(201)
    .json(
      new ApiResponse(201, newSubcategory, "Subcategory added successfully")
    );
});

const getAllSubCategories = asyncHandler(async (req, res) => {
  const category = await SubcategoryModel.find();

  if (!category) {
    throw new AppError(404, "No subcategories found.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, category, "Subcategories retrieved successfully")
    );
});

const getSubCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subcategory = await SubcategoryModel.findById(id);
  if (!subcategory) {
    throw new AppError(404, "subcategory not found.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, subcategory, "Subcategory retrieved successfully")
    );
});

const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, category } = req.body;

  // Find subcategory
  const subcategory = await SubcategoryModel.findById(id);
  if (!subcategory) {
    return next(new AppError(404, "Subcategory not found."));
  }

  subcategory.name = name?.trim() || subcategory.name;
  subcategory.description = description?.trim() || subcategory.description;
  subcategory.category = category || subcategory.category;

  await subcategory.save();
  res
    .status(200)
    .json(
      new ApiResponse(200, subcategory, "Subcategory updated successfully")
    );
});

const deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the subcategory first
  const subcategory = await SubcategoryModel.findById(id);
  if (!subcategory) {
    throw new AppError(404, "Subcategory not found.");
  }

  // Find the parent category of this subcategory
  const category = await CategoryModel.findById(subcategory.category);
  if (category) {
    category.subcategories = category.subcategories.filter(
      (sub) => sub.toString() !== id
    );
    await category.save();
  }

  // Delete the subcategory
  await SubcategoryModel.findByIdAndDelete(id);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Subcategory deleted successfully"));
});

export {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
