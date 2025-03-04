import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Event Management API",
      description: "API documentation for the Event Management application",
      contact: {
        name: "Support Team",
        email: "support@example.com",
      },
    },
    host: "localhost:4000",
    basePath: "/api/v1",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "Authentication related endpoints",
      },
      { name: "Booking", description: "Booking related endpoints" },
      { name: "SubCategories", description: "SubCategories categories" },
      { name: "Services", description: "Services endpoints" },
      { name: "Categories", description: "Categories management" },
      { name: "Users", description: "User management endpoints" },
    ],
  },
  apis: [
    "./src/modules/user/user.routes.js",
    "./src/modules/booking/booking.routes.js",
    "./src/modules/auth/auth.routes.js",
    "./src/modules/category/category.routes.js",
    "./src/modules/services/services.routes.js",
    "./src/modules/subcategory/subcategory.routes.js",
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
