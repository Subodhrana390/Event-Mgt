import { ServicesModel } from "../../../Database/models/services.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getDatesForCurrentMonth } from "../../utils/dateUtils.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { AppError } from "../../utils/AppError.js";

const createService = asyncHandler(async (req, res) => {
  let { title, description, category, subcategory, packages, faqs, questions } =
    req.body;

  const eventType = req.body.eventType
    ? req.body.eventType.split(",").map((item) => item.trim())
    : [];

  const tags = req.body.tags
    ? req.body.tags.split(",").map((item) => item.trim())
    : [];

  const parsedQuestions = JSON.parse(questions);
  const parsedFAQ = JSON.parse(faqs);
  const parsedPackages = JSON.parse(packages);

  const images = req.files["images"]?.map((file) => file.filename) || [];
  const video = req.files["video"]?.[0]?.filename || null;
  const documents = req.files["documents"]?.map((file) => file.filename) || [];

  const availableDates = getDatesForCurrentMonth();

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
    documents,
    faqs: parsedFAQ,
    questions: parsedQuestions,
    tags,
    availableDates,
  });

  const savedService = await newService.save();
  res.status(201).json(new ApsavedService());
});

// Get all services
const getAllServices = asyncHandler(async (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  const totalServices = await ServicesModel.countDocuments();

  const services = await ServicesModel.find()
    .populate("seller", "name email")
    .populate("category", "name")
    .populate("subcategory", "name")
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
      "Service retrived Successfully"
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

  if (value.eventType && typeof value.eventType === "string") {
    value.eventType = value.eventType.split(",").map((item) => item.trim());
  }
  if (value.tags && typeof value.tags === "string") {
    value.tags = value.tags.split(",").map((item) => item.trim());
  }

  const fieldsToParse = ["packages", "questions", "faqs"];
  fieldsToParse.forEach((field) => {
    if (value[field] && typeof value[field] === "string") {
      try {
        value[field] = JSON.parse(value[field]);
      } catch (error) {
        return next(new AppError(400, `Invalid ${field} format`));
      }
    }
  });

  // Handle file uploads
  if (req.files) {
    if (req.files["images"]) {
      value.images = req.files["images"].map((file) => file.filename);
    }
    if (req.files["video"]) {
      value.video = req.files["video"][0]?.filename || null;
    }
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

// Add current month dates to availableDates
const addCurrentMonthDates = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await ServicesModel.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const currentMonthDates = getDatesForCurrentMonth();
    const existingDates = service.availableDates.map(
      (date) => date.toISOString().split("T")[0]
    );

    // Add only new dates
    currentMonthDates.forEach((date) => {
      const dateString = date.toISOString().split("T")[0];
      if (!existingDates.includes(dateString)) {
        service.availableDates.push(date);
      }
    });

    const updatedService = await service.save();
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Book a date (remove from availableDates)
const bookDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookedDate } = req.body;

    const service = await ServicesModel.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Convert bookedDate to a Date object (if it's a string)
    const dateToRemove = new Date(bookedDate + "T00:00:00Z");

    // Remove the booked date from availableDates
    service.availableDates = service.availableDates.filter(
      (date) =>
        date.toISOString().split("T")[0] !==
        dateToRemove.toISOString().split("T")[0]
    );

    const updatedService = await service.save();
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  addCurrentMonthDates,
  bookDate,
};
