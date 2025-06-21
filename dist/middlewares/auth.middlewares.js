"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = AuthMiddleware;
const jwt_1 = require("../utils/jwt");
const database_1 = require("../configs/database");
function AuthMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                const error = new Error("Unauthorized: No token provided");
                error.status = 401;
                throw error;
            }
            const token = authHeader.split(" ")[1];
            const decoded = (0, jwt_1.verifyToken)(token);
            // Optional: If token only contains email or userId, fetch full user
            const userResult = yield database_1.db.query("SELECT id FROM users WHERE email = $1", [
                decoded.email,
            ]);
            if (userResult.rows.length === 0) {
                const error = new Error("User not found");
                error.status = 401;
                throw error;
            }
            req.user = Object.assign(Object.assign({}, decoded), { id: userResult.rows[0].id });
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
