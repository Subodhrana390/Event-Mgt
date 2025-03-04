import express from "express";
import { dbConnection } from "./Database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("uploads"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

bootstrap(app);
dbConnection();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
