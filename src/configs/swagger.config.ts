import swaggerJSDoc from "swagger-jsdoc";
import { PORT } from ".";

// i should change the server part when deploy
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BitHealth Technical Test API Docs",
      version: "1.0.0",
      description: "Swagger API docs using TypeScript + Express",
    },
    servers: [{ url: `http://localhost:${PORT || 8000}/api/v1` }],
  },
  apis: ["./src/modules/**/*.routes.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
