"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErrorMiddleware;
function ErrorMiddleware(err, req, res, next) {
    var _a;
    const status = (_a = err.status) !== null && _a !== void 0 ? _a : 500;
    const message = err.message || "Internal Server Error";
    res.status(status).send({
        success: false,
        status,
        message,
    });
}
