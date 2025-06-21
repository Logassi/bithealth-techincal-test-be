"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidation = exports.RegisterValidation = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("./validate");
exports.RegisterValidation = [
    (0, express_validator_1.body)("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("Name is required"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .matches(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/)
        .withMessage("Password must contain at least 1 number and 1 special character"),
    (0, express_validator_1.body)("role_id")
        .notEmpty()
        .withMessage("Role ID is required")
        .isInt()
        .withMessage("Role ID must be an integer"),
    validate_1.validate,
];
exports.LoginValidation = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    validate_1.validate,
];
