import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./configs/swagger.config";
import cors from "cors";
import { FRONTEND_URL } from "./configs";

const app: Application = express();

//Middleware function in Express.js that parses incoming JSON payloads and makes the data available in req.body
app.use(express.json());

// Swagger docs
// app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-standalone-preset.min.js",
    ],
  })
);

app.use(
  cors({
    origin: FRONTEND_URL || "http://localhost:3001",
    credentials: true, // If using cookies/sessions
  })
);

// app.use("/route", route);

export default app;
