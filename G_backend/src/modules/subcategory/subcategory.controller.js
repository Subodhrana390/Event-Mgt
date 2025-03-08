import { SubcategoryModel } from "../../../Database/models/subcategory.model.js";
import { CategoryModel } from "../../../Database/models/category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import ApiResponse from "../../utils/ApiResponse.js";

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

const addSubcategoryToCategory = async (categoryId, subcategoryId) => {
  await CategoryModel.findByIdAndUpdate(
    categoryId,
    { $push: { subcategories: subcategoryId } },
    { new: true }
  );
};

const getAllSubCategories = asyncHandler(async (req, res) => {
  const category = await SubcategoryModel.find().populate(
    "category"
  );

  if (!category) {
    throw new AppError(404, "Category not found.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, category, "Subcategories retrieved successfully")
    );
});

const getSubCategoryById = asyncHandler(async (req, res) => {
  const { categoryId, subcategoryId } = req.params;

  const category = await CategoryModel.findById(categoryId).populate(
    "subcategories"
  );

  if (!category) {
    throw new AppError(404, "Category not found.");
  }

  const subcategory = category.subcategories.find(
    (sub) => sub._id.toString() === subcategoryId
  );

  if (!subcategory) {
    throw new AppError(404, "Subcategory not found.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, subcategory, "Subcategory retrieved successfully")
    );
});

const updateSubCategory = asyncHandler(async (req, res) => {
  const { subcategoryId } = req.params;
  const { name, description } = req.body;

  const subcategory = await SubcategoryModel.findById(subcategoryId);

  if (!subcategory) {
    throw new AppError(404, "Subcategory not found.");
  }

  subcategory.name = name || subcategory.name;
  subcategory.description = description || subcategory.description;

  await subcategory.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, subcategory, "Subcategory updated successfully")
    );
});

const deleteSubCategory = asyncHandler(async (req, res) => {
  const { categoryId, subcategoryId } = req.params;

  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    throw new AppError(404, "Category not found.");
  }

  category.subcategories = category.subcategories.filter(
    (sub) => sub.toString() !== subcategoryId
  );
  await category.save();

  await SubcategoryModel.findByIdAndDelete(subcategoryId);

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
