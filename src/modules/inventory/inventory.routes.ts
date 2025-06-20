import { Router } from "express";
import { RoleGuard } from "../../middlewares/role-guard.middlewares";
import {
  AddGoods,
  DeleteGoods,
  GetAllGoods,
  UpdateGoods,
} from "./inventory.controller";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import {
  AddGoodsValidation,
  DeleteGoodsValidation,
  GetAllGoodsValidation,
  UpdateGoodsValidation,
} from "../../middlewares/validations/inventory.validation";

const router = Router();

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

router.get(
  "/get-inventory",
  AuthMiddleware,
  RoleGuard("admin", "staff"),
  GetAllGoodsValidation,
  GetAllGoods
);

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

router.post(
  "/add-goods",
  AuthMiddleware,
  RoleGuard("admin", "staff"),
  AddGoodsValidation,
  AddGoods
);

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

router.put(
  "/update-goods/:id",
  AuthMiddleware,
  RoleGuard("admin", "staff"),
  UpdateGoodsValidation,
  UpdateGoods
);

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

router.delete(
  "/delete-goods/:id",
  AuthMiddleware,
  RoleGuard("admin"),
  DeleteGoodsValidation,
  DeleteGoods
);

export default router;
