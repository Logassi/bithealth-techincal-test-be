"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGoodsValidation = exports.UpdateGoodsValidation = exports.GetAllGoodsValidation = exports.AddGoodsValidation = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("./validate");
exports.AddGoodsValidation = [
    (0, express_validator_1.body)("goods_name")
        .isString()
        .withMessage("Goods name must be a string")
        .notEmpty()
        .withMessage("Goods name is required"),
    (0, express_validator_1.body)("goods_quantity")
        .isInt({ min: 1 })
        .withMessage("Goods quantity must be a positive integer"),
    validate_1.validate,
];
exports.GetAllGoodsValidation = [
    (0, express_validator_1.query)("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),
    (0, express_validator_1.query)("limit")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Limit must be a positive integer"),
    (0, express_validator_1.query)("search").optional().isString().withMessage("Search must be a string"),
    validate_1.validate,
];
exports.UpdateGoodsValidation = [
    (0, express_validator_1.param)("id").isUUID().withMessage("Invalid inventory ID"),
    (0, express_validator_1.body)("goods_name")
        .optional()
        .isString()
        .withMessage("Goods name must be a string"),
    (0, express_validator_1.body)("goods_quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Goods quantity must be a positive integer"),
    validate_1.validate,
];
exports.DeleteGoodsValidation = [
    (0, express_validator_1.param)("id").isUUID().withMessage("Invalid inventory ID"),
    validate_1.validate,
];
