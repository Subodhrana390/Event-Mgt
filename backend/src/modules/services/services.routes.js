import express from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "./services.controller.js";
import {
  createServiceSchema,
  updateServiceSchema,
  validateMongoId,
} from "./services.validation.js";
import { validate } from "../../middlewares/validate.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { uploadMultipleFiles } from "../../../multer/multer.js";
const servicesRouter = express.Router();

servicesRouter.post(
  "/",
  protectedRoutes,
  allowedTo("admin"),
  uploadMultipleFiles([{ name: "images", maxCount: 3 }], "services"),
  validate(createServiceSchema),
  createService
);
servicesRouter.get("/", getAllServices);
servicesRouter.get("/:id", validate(validateMongoId), getServiceById);
servicesRouter.put(
  "/:id",
  validate(validateMongoId),
  protectedRoutes,
  allowedTo("admin"),
  uploadMultipleFiles([{ name: "images", maxCount: 3 }], "services"),
  validate(updateServiceSchema),
  updateService
);
servicesRouter.delete(
  "/:id",
  validate(validateMongoId),
  protectedRoutes,
  allowedTo("admin"),
  deleteService
);

export default servicesRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     Services:
 *       type: object
 *       properties:
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
 *         video:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: binary  # Define each image as a file
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the service
 *                 example: "Professional Wedding Photography"
 *               description:
 *                 type: string
 *                 description: Service description
 *                 example: "Capture your special moments with high-quality photography."
 *               category:
 *                 type: string
 *                 description: Category ID (MongoDB ObjectId)
 *                 example: "65bc1234abcd5678ef901234"
 *               subcategory:
 *                 type: string
 *                 description: Subcategory ID (MongoDB ObjectId)
 *                 example: "65bc5678abcd1234ef905678"
 *               eventType:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of event types (Send multiple values as separate keys)
 *                 example: ["Wedding", "Corporate Event"]
 *               packages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Standard"
 *                     title:
 *                       type: string
 *                       example: "Basic Package"
 *                     description:
 *                       type: string
 *                       example: "Includes 2-hour session and 50 edited photos."
 *                     price:
 *                       type: number
 *                       example: 199.99
 *                     features:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["HD Photos", "Free Editing"]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Search tags for the service
 *                 example: ["Photography", "Weddings"]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Image files for the service
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Video file for the service
 *     responses:
 *       201:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   $ref: '#/components/schemas/Services'
 *                 message:
 *                   type: string
 *                   example: "Service created successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request (Invalid input)
 *       401:
 *         description: Unauthorized (Missing or invalid token)
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /api/v1/services:
 *   get:
 *     summary: Get all services
 *     description: Fetch a list of all available services.
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of services retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 - _id: "67cbda69bb4c8e30304e3222"
 *                   title: "Event Photography Services"
 *                   description: "Capturing your special events with professional photography."
 *                   seller:
 *                     _id: "67c723526c7607890b25ac76"
 *                   category:
 *                     _id: "67cbed9795d8c1bef84749ee"
 *                     name: "Photography"
 *                     icon: "http://localhost:3000/category/camera.jpeg"
 *                   subcategory:
 *                     _id: "67ba0dd9dce6e4d14af441a9"
 *                     name: "Event Photographers"
 *                     description: "Coverage for weddings, concerts, and corporate events."
 *                   eventType: ["Corporate Events", "Parties", "Conferences"]
 *                   packages:
 *                     - type: "Basic"
 *                       title: "Basic Event Coverage"
 *                       description: "Covers all the key moments during your event."
 *                       features: ["Up to 4 hours", "200 photos", "Basic editing"]
 *                       price: 600
 *                     - type: "Deluxe"
 *                       title: "Deluxe Event Coverage"
 *                       description: "Complete event coverage including candid shots."
 *                       features: ["Full day coverage", "500+ photos", "Advanced editing", "Printed album"]
 *                       price: 1500
 *                   rating: 4.9
 *                   tags: ["event", "photography", "party", "conference"]
 *                   availableDates: ["2025-05-18T10:00:00Z", "2025-06-30T10:00:00Z"]
 *                   video: "https://link-to-video.com/video_event.mp4"
 *                   images:
 *                     - "https://link-to-image.com/event1.jpg"
 *                     - "https://link-to-image.com/event2.jpg"
 *                   documents:
 *                     - "https://link-to-document.com/event-package.pdf"
 *               message: "Services retrieved successfully"
 *               success: true
 *       404:
 *         description: No services found.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 404
 *               message: "No services found"
 *               success: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: "Internal server error"
 *               success: false
 */

/**
 * @swagger
 * /api/v1/services/{id}:
 *   get:
 *     summary: Get service details by ID
 *     tags: [Services]
 *     description: Retrieve details of a specific service by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Service details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "65bc1234abcd5678ef901234"
 *                     title:
 *                       type: string
 *                       example: "Professional Wedding Photography"
 *                     description:
 *                       type: string
 *                       example: "Capture your special moments with high-quality photography."
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "65bc1234abcd5678ef901234"
 *                         name:
 *                           type: string
 *                           example: "Photography"
 *                     subcategory:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "65bc5678abcd1234ef905678"
 *                         name:
 *                           type: string
 *                           example: "Wedding Photography"
 *                     eventType:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Wedding", "Corporate Event"]
 *                     packages:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: "Standard"
 *                           title:
 *                             type: string
 *                             example: "Basic Package"
 *                           description:
 *                             type: string
 *                             example: "Includes 2-hour session and 50 edited photos."
 *                           price:
 *                             type: number
 *                             example: 199.99
 *                           features:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["HD Photos", "Free Editing"]
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Photography", "Weddings"]
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["image1.jpg", "image2.jpg"]
 *                     video:
 *                       type: string
 *                       example: "service-video.mp4"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-10T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-12T14:30:00Z"
 *       400:
 *         description: Bad request (Invalid ID format)
 *       401:
 *         description: Unauthorized (User not authenticated)
 *       403:
 *         description: Forbidden (User does not have permission to view this service)
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/services/{id}:
 *   put:
 *     summary: Update a service
 *     tags: [Services]
 *     description: Update an existing service by ID. Supports multipart form-data for file uploads.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the service
 *                 example: "Professional Wedding Photography"
 *               description:
 *                 type: string
 *                 description: Service description
 *                 example: "Capture your special moments with high-quality photography."
 *               category:
 *                 type: string
 *                 description: Category ID (MongoDB ObjectId)
 *                 example: "65bc1234abcd5678ef901234"
 *               subcategory:
 *                 type: string
 *                 description: Subcategory ID (MongoDB ObjectId)
 *                 example: "65bc5678abcd1234ef905678"
 *               eventType:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of event types (Send multiple values as separate keys)
 *                 example: ["Wedding", "Corporate Event"]
 *               packages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Standard"
 *                     title:
 *                       type: string
 *                       example: "Basic Package"
 *                     description:
 *                       type: string
 *                       example: "Includes 2-hour session and 50 edited photos."
 *                     price:
 *                       type: number
 *                       example: 199.99
 *                     features:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["HD Photos", "Free Editing"]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Search tags for the service
 *                 example: ["Photography", "Weddings"]
 *               faqs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       example: "What is the cancellation policy?"
 *                     answer:
 *                       type: string
 *                       example: "Full refund if canceled within 48 hours."
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                       example: "Do you offer video coverage?"
 *                     details:
 *                       type: string
 *                       example: "Yes, we provide video coverage as an add-on."
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Image files for the service
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Video file for the service
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Updated service details
 *       400:
 *         description: Bad request (Validation errors or invalid ID)
 *       401:
 *         description: Unauthorized (User not authenticated)
 *       403:
 *         description: Forbidden (User does not have permission to update this service)
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/services/{id}:
 *   delete:
 *     summary: Delete a service
 *     description: Allows an admin to delete a service by its ID.
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the service to delete.
 *     responses:
 *       200:
 *         description: Service deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data: null
 *               message: Service deleted successfully
 *               success: true
 *       400:
 *         description: Invalid service ID format.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 400
 *               message: Invalid service ID
 *               success: false
 *       401:
 *         description: Unauthorized - User is not logged in.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 401
 *               message: Unauthorized
 *               success: false
 *       403:
 *         description: Forbidden - User does not have permission to delete services.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 403
 *               message: Access denied
 *               success: false
 *       404:
 *         description: Service not found.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 404
 *               message: Service not found
 *               success: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: Internal server error
 *               success: false
 */
