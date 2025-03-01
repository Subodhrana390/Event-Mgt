import express from "express";
import {
  createService,
  addCurrentMonthDates,
  bookDate,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "./services.controller.js";
import {
  bookDateSchema,
  createServiceSchema,
  updateServiceSchema,
} from "./services.validation.js";
import { validate } from "../../middlewares/validate.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { uploadMultipleFiles } from "../../../multer/multer.js";
const servicesRouter = express.Router();

// Create a new service
servicesRouter.post(
  "/",
  protectedRoutes,
  allowedTo("seller"),
  uploadMultipleFiles(
    [
      { name: "images", maxCount: 3 },
      { name: "video", maxCount: 1 },
      { name: "documents", maxCount: 2},
    ],
    "services"
  ),
  createService
);
// Get all services
servicesRouter.get("/", getAllServices);

// Get a single service by ID
servicesRouter.get("/:id", getServiceById);

// Update a service by ID
servicesRouter.put("/:id", validate(updateServiceSchema), updateService);

// Delete a service by ID
servicesRouter.delete("/:id", deleteService);

// Add current month dates to availableDates
servicesRouter.post("/:id/add-dates", addCurrentMonthDates);

// Book a date (remove from availableDates)
servicesRouter.post("/:id/book-date", validate(bookDateSchema), bookDate);

export default servicesRouter;
