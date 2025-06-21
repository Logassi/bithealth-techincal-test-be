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
    servers: [{ url: `https://bithealth-techincal-test-be.vercel.app` }],
  },
  // apis: ["./src/modules/**/*.routes.ts"],
  apis: ["./dist/modules/**/*.routes.js"],
  // apis: [__dirname + "/../modules/**/*.routes.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
