import swaggerJSDoc from "swagger-jsdoc";
import { PORT } from ".";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BitHealth Technical Test API Docs",
      version: "1.0.0",
      description: "Swagger API docs using TypeScript + Express",
    },
    servers: [{ url: `http://localhost:${PORT || 8000}` }],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
