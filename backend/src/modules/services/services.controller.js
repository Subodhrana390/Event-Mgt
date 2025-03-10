import { ServicesModel } from "../../../Database/models/services.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { AppError } from "../../utils/AppError.js";

const createService = asyncHandler(async (req, res) => {
  let { title, description, category, subcategory, packages } = req.body;

  const eventType = req.body.eventType
    ? req.body.eventType.split(",").map((item) => item.trim())
    : [];

  const tags = req.body.tags
    ? req.body.tags.split(",").map((item) => item.trim())
    : [];

  const parsedPackages = JSON.parse(packages);

  const images = req.files["images"]?.map((file) => file.filename) || [];

  const newService = new ServicesModel({
    title,
    description,
    seller: req.user._id,
    category,
    subcategory,
    eventType,
    packages: parsedPackages,
    images,
    video,
    tags,
  });

  const savedService = await newService.save();
  res
    .status(201)
    .json(new ApiResponse(201, savedService, "Service created successfully"));
});

// Get all services
const getAllServices = asyncHandler(async (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  const { sort, category, subcategory, minPrice, maxPrice } = req.query;

  let filter = {};

  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  let sortOptions = { createdAt: -1 }; // Default sorting (newest)

  if (sort === "rating") {
    sortOptions = { rating: -1 };
  } else if (sort === "priceLow") {
    sortOptions = { price: 1 };
  } else if (sort === "priceHigh") {
    sortOptions = { price: -1 };
  }

  const totalServices = await ServicesModel.countDocuments(filter);

  const services = await ServicesModel.find(filter)
    .populate("seller", "name email")
    .populate("category", "name")
    .populate("subcategory", "name")
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .lean();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        totalPages: Math.ceil(totalServices / limit),
        currentPage: page,
        totalServices,
        services,
      },
      "Services retrieved successfully"
    )
  );
});

// Get a single service by ID
const getServiceById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const service = await ServicesModel.findById(id)
    .populate("seller", "name email")
    .populate("category", "name icon")
    .populate("subcategory", "name description")
    .lean();

  if (!service) {
    throw new AppError(404, "Service not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, service, "Service retrived Successfully"));
});

const updateService = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let value = { ...req.body };

  const parseJSONField = (field) => {
    if (!value[field]) return;
    try {
      value[field] = JSON.parse(value[field]);
      if (!Array.isArray(value[field])) {
        throw new Error(`${field} must be an array`);
      }
    } catch (error) {
      return next(
        new AppError(400, `Invalid JSON format for ${field}: ${error.message}`)
      );
    }
  };

  parseJSONField("eventType");
  parseJSONField("tags");
  parseJSONField("packages");

  if (req.files && req.files["images"]) {
    value.images = req.files["images"].map((file) => file.filename);
  }

  const updatedService = await ServicesModel.findByIdAndUpdate(id, value, {
    new: true,
    runValidators: true,
  }).populate("seller category subcategory");

  if (!updatedService) {
    return next(new AppError(404, "Service not found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedService, "Service updated successfully"));
});

// Delete a service by ID
const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedService = await ServicesModel.findByIdAndDelete(id);
  if (!deletedService) {
    return res.status(404).json({ message: "Service not found" });
  }
  res
    .status(200)
    .json(new ApiResponse(200, null, "Service deleted successfully"));
});

export {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
