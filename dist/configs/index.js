"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTEND_URL = exports.DATABASE_URL = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: ".env",
});
_a = process.env, exports.PORT = _a.PORT, exports.DATABASE_URL = _a.DATABASE_URL, exports.FRONTEND_URL = _a.FRONTEND_URL;
