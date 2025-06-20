import { body, param, query } from "express-validator";
import { validate } from "./validate";

export const AddGoodsValidation = [
  body("goods_name")
    .isString()
    .withMessage("Goods name must be a string")
    .notEmpty()
    .withMessage("Goods name is required"),

  body("goods_quantity")
    .isInt({ min: 1 })
    .withMessage("Goods quantity must be a positive integer"),

  validate,
];

export const GetAllGoodsValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),

  query("search").optional().isString().withMessage("Search must be a string"),

  validate,
];

export const UpdateGoodsValidation = [
  param("id").isUUID().withMessage("Invalid inventory ID"),

  body("goods_name")
    .optional()
    .isString()
    .withMessage("Goods name must be a string"),

  body("goods_quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Goods quantity must be a positive integer"),

  validate,
];

export const DeleteGoodsValidation = [
  param("id").isUUID().withMessage("Invalid inventory ID"),

  validate,
];
