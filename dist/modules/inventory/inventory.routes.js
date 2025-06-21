"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_guard_middlewares_1 = require("../../middlewares/role-guard.middlewares");
const inventory_controller_1 = require("./inventory.controller");
const auth_middlewares_1 = require("../../middlewares/auth.middlewares");
const inventory_validation_1 = require("../../middlewares/validations/inventory.validation");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management operations
 */
/**
 * @swagger
 * /api/v1/inventory/get-inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search keyword for goods name
 *     responses:
 *       200:
 *         description: List of inventory items with metadata
 */
router.get("/get-inventory", auth_middlewares_1.AuthMiddleware, (0, role_guard_middlewares_1.RoleGuard)("admin", "staff"), inventory_validation_1.GetAllGoodsValidation, inventory_controller_1.GetAllGoods);
// router.get(
//   "/get-goods",
//   AuthMiddleware,
//   RoleGuard("admin", "staff"),
//   GetAGoods
// );
/**
 * @swagger
 * /api/v1/inventory/add-goods:
 *   post:
 *     summary: Add a new inventory item
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - goods_name
 *               - goods_quantity
 *             properties:
 *               goods_name:
 *                 type: string
 *               goods_quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item added successfully
 */
router.post("/add-goods", auth_middlewares_1.AuthMiddleware, (0, role_guard_middlewares_1.RoleGuard)("admin", "staff"), inventory_validation_1.AddGoodsValidation, inventory_controller_1.AddGoods);
/**
 * @swagger
 * /api/v1/inventory/update-goods/{id}:
 *   put:
 *     summary: Update inventory item quantity or name
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - goods_quantity
 *               - action
 *             properties:
 *               goods_name:
 *                 type: string
 *               goods_quantity:
 *                 type: number
 *               action:
 *                 type: string
 *                 enum: [incoming, outgoing]
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 */
router.put("/update-goods/:id", auth_middlewares_1.AuthMiddleware, (0, role_guard_middlewares_1.RoleGuard)("admin", "staff"), inventory_validation_1.UpdateGoodsValidation, inventory_controller_1.UpdateGoods);
/**
 * @swagger
 * /api/v1/inventory/delete-goods/{id}:
 *   delete:
 *     summary: Soft delete an inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory item soft-deleted successfully
 */
router.delete("/delete-goods/:id", auth_middlewares_1.AuthMiddleware, (0, role_guard_middlewares_1.RoleGuard)("admin"), inventory_validation_1.DeleteGoodsValidation, inventory_controller_1.DeleteGoods);
exports.default = router;
