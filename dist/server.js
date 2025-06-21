"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = require("./configs/swagger.config");
const cors_1 = __importDefault(require("cors"));
const configs_1 = require("./configs");
const app = (0, express_1.default)();
//Middleware function in Express.js that parses incoming JSON payloads and makes the data available in req.body
app.use(express_1.default.json());
// Swagger docs
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.swaggerSpec));
app.use((0, cors_1.default)({
    origin: configs_1.FRONTEND_URL || "http://localhost:3001",
    credentials: true, // If using cookies/sessions
}));
// app.use("/route", route);
exports.default = app;
