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
exports.TestService = TestService;
exports.GetAllUserData = GetAllUserData;
exports.Register = Register;
exports.Login = Login;
const bcrypt_1 = require("bcrypt");
const database_1 = require("../../configs/database");
const jwt_1 = require("../../utils/jwt");
function TestService() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            message: "Test Service",
        };
    });
}
function GetAllUserData() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.db.query("SELECT * FROM users");
        return result.rows;
    });
}
function Register(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password, role_id } = req.body;
        const existingUser = yield database_1.db.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (existingUser.rows.length > 0) {
            const error = new Error("Email already registered");
            error.status = 409;
            throw error;
        }
        const salt = yield (0, bcrypt_1.genSalt)(10);
        const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
        const registerQuery = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id
  `;
        const userResult = yield database_1.db.query(registerQuery, [
            name,
            email,
            hashedPassword,
        ]);
        const userId = userResult.rows[0].id;
        const assignRoleQuery = `
    INSERT INTO user_role (user_id, role_id)
    VALUES ($1, $2)
  `;
        yield database_1.db.query(assignRoleQuery, [userId, role_id]);
        return {
            message: `Register Success`,
        };
    });
}
function Login(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const userQuery = `
    SELECT 
      u.id, u.name, u.email, u.password,
      r.role_name AS role
    FROM users u
    JOIN user_role ur ON ur.user_id = u.id
    JOIN roles r ON r.id = ur.role_id
    WHERE u.email = $1
  `;
        const result = yield database_1.db.query(userQuery, [email]);
        if (result.rows.length === 0) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        const user = result.rows[0];
        const isMatch = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isMatch) {
            const error = new Error("Invalid credentials");
            error.status = 401;
            throw error;
        }
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role_id: user.role,
        };
        const token = (0, jwt_1.signToken)(payload);
        return {
            message: "Login successful",
            access_token: token,
            // user: {
            //   id: user.id,
            //   name: user.name,
            //   email: user.email,
            //   role: user.role,
            // },
        };
    });
}
