import { ServicesModel } from "../../../Database/models/services.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getDatesForCurrentMonth } from "../../utils/dateUtils.js";

// Create a new service
const createService = asyncHandler(async (req, res) => {
  let {
    title,
    description,
    category,
    subcategory,
    eventType = "[]",
    packages = "[]",
    tags = "[]",
    faqs = "[]",
    questions = "[]",
  } = req.body;

  const parsedEventType = JSON.parse(eventType) || [];
  const parsedTags = JSON.parse(tags) || [];
  const parsedQuestions =
    JSON.parse(questions)?.map((f) => ({
      text: f.text,
      details: f.details,
    })) || [];
  const parsedFAQ =
    JSON.parse(faqs)?.map((f) => ({
      question: f.question,
      answer: f.answer,
    })) || [];
  const parsedPackages =
    JSON.parse(packages)?.map((pkg) => ({
      type: pkg.type,
      title: pkg.title,
      description: pkg.description,
      price: Number(pkg.price) || 0,
      features: Array.isArray(pkg.features) ? pkg.features : [],
    })) || [];

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
    eventType: parsedEventType,
    packages: parsedPackages,
    images,
    video,
    documents,
    faqs: parsedFAQ,
    questions: parsedQuestions,
    tags: parsedTags,
    availableDates,
  });

  const savedService = await newService.save();
  res.status(201).json({ savedService });
});

// Get all services
const getAllServices = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalServices = await ServicesModel.countDocuments();
  const services = await ServicesModel.find()
    .populate("seller")
    .populate("Category")
    .populate("Subcategory")
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    totalPages: Math.ceil(totalServices / limit),
    currentPage: page,
    totalServices,
    services,
  });
});

// Get a single service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await ServicesModel.findById(id)
      .populate("seller")
      .populate("category")
      .populate("subcategory");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service by ID
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedService = await ServicesModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    )
      .populate("seller")
      .populate("reviews");

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service by ID
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await ServicesModel.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
