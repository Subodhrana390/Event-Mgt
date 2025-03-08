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

/**
 * @swagger
 * components:
 *   schemas:
 *     Services:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the service
 *         title:
 *           type: string
 *           description: The title of the service
 *         description:
 *           type: string
 *           description: The service description
 *         seller:
 *           type: string
 *           description: ID of the seller who created the service
 *         category:
 *           type: string
 *           description: Category ID associated with the service
 *         subcategory:
 *           type: string
 *           description: Subcategory ID associated with the service
 *         eventType:
 *           type: array
 *           items:
 *             type: string
 *         packages:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               price:
 *                 type: number
 *         rating:
 *           type: number
 *           default: 0
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         availableDates:
 *           type: array
 *           items:
 *             type: string
 *             format: date-time
 *         video:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         documents:
 *           type: array
 *           items:
 *             type: string
 *       example:
 *         id: "605c72efabf21b001f355765"
 *         title: "Photography Service"
 *         description: "Professional wedding photography"
 *         seller: "605c72efabf21b001f355766"
 *         category: "605c72efabf21b001f355767"
 *         subcategory: "605c72efabf21b001f355768"
 *         eventType: ["Wedding", "Engagement"]
 *         packages: [{"type": "Standard", "title": "Basic Package", "description": "Includes 5 hours of coverage", "features": ["HD photos", "Photo album"], "price": 500}]
 *         rating: 4.5
 *         tags: ["wedding", "photography"]
 *         availableDates: ["2025-03-10T00:00:00.000Z"]
 *         video: "http://example.com/video.mp4"
 *         images: ["http://example.com/image1.jpg"]
 *         documents: ["http://example.com/contract.pdf"]
 */

/**
 * @swagger
 * /api/v1/services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Services'
 *     responses:
 *       201:
 *         description: Service created successfully
 */
servicesRouter.post(
  "/",
  protectedRoutes,
  allowedTo("seller"),
  validate(createServiceSchema),
  uploadMultipleFiles(
    [
      { name: "images", maxCount: 3 },
      { name: "video", maxCount: 1 },
      { name: "documents", maxCount: 2 },
    ],
    "services"
  ),
  createService
);

/**
 * @swagger
 * /api/v1/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of services
 */
servicesRouter.get("/", getAllServices);

/**
 * @swagger
 * /api/v1/services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 */
servicesRouter.get("/:id", getServiceById);

/**
 * @swagger
 * /api/v1/services/{id}:
 *   put:
 *     summary: Update a service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service updated successfully
 */
servicesRouter.put("/:id", validate(updateServiceSchema), updateService);

/**
 * @swagger
 * /api/v1/services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service deleted successfully
 */
servicesRouter.delete("/:id", deleteService);

/**
 * @swagger
 * /api/v1/services/{id}/add-dates:
 *   post:
 *     summary: Add current month dates
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dates added successfully
 */
servicesRouter.post("/:id/add-dates", addCurrentMonthDates);

/**
 * @swagger
 * /api/v1/services/{id}/book-date:
 *   post:
 *     summary: Book a date
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Date booked successfully
 */
servicesRouter.post("/:id/book-date", validate(bookDateSchema), bookDate);

export default servicesRouter;
