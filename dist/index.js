"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const configs_1 = require("./configs");
const error_handler_middlewares_1 = __importDefault(require("./middlewares/error-handler.middlewares"));
const routes_1 = __importDefault(require("./routes"));
// import "./index"; // This loads src/types/index.d.ts
const PORT = configs_1.PORT || 8000;
// app.use("/api", routes);
server_1.default.use("/api", routes_1.default);
server_1.default.use(error_handler_middlewares_1.default);
server_1.default.listen(PORT, () => {
    // console.log(`${}`);
    console.log(`Server started on port ${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api/docs`);
});
