"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// i should change the server part when deploy
const options = {
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
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
