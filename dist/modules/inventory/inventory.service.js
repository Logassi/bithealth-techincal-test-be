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
exports.Add = Add;
exports.GetAll = GetAll;
exports.Update = Update;
exports.Delete = Delete;
const database_1 = require("../../configs/database");
function Add(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { goods_name, goods_quantity } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Ensure middleware attaches `user` to req
        if (!userId) {
            const error = new Error("Unauthorized - no user ID found");
            error.status = 401;
            throw error;
        }
        const normalizedName = goods_name.trim().replace(/\s+/g, " ");
        const exists = yield database_1.db.query(`SELECT id FROM inventory WHERE LOWER(goods_name) = LOWER($1) AND is_deleted = false`, [normalizedName]);
        if (exists.rows.length > 0) {
            const error = new Error("Item with the same name already exists");
            error.status = 409; // Conflict
            throw error;
        }
        // 1. Insert into inventory
        const insertInventoryQuery = `
      INSERT INTO inventory (goods_name, goods_quantity, create_by)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
        const inventoryResult = yield database_1.db.query(insertInventoryQuery, [
            normalizedName,
            goods_quantity,
            userId,
        ]);
        const inventoryId = inventoryResult.rows[0].id;
        // 2. Insert into inventory_logs
        const insertLogQuery = `
      INSERT INTO inventory_logs (goods_id, user_id, action, quantity_changed)
      VALUES ($1, $2, 'incoming', $3)
    `;
        yield database_1.db.query(insertLogQuery, [inventoryId, userId, goods_quantity]);
        return {
            message: "Goods added successfully",
            inventory_id: inventoryId,
        };
        // 3. Return response
        // res.status(201).json({
        //   message: "Goods added successfully",
        //   inventory_id: inventoryId,
        // });
    });
}
// Read All
function GetAll(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page = 1, limit = 10, search = "" } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        const searchQuery = `%${search.toLowerCase()}%`;
        const dataQuery = `
    SELECT * FROM inventory
    WHERE LOWER(goods_name) LIKE $1 AND is_deleted = FALSE
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;
        const result = yield database_1.db.query(dataQuery, [searchQuery, limit, offset]);
        const countQuery = `
    SELECT COUNT(*) FROM inventory
    WHERE LOWER(goods_name) LIKE $1 AND is_deleted = FALSE
  `;
        const countResult = yield database_1.db.query(countQuery, [searchQuery]);
        const totalItems = parseInt(countResult.rows[0].count);
        const totalPages = Math.ceil(totalItems / Number(limit));
        return {
            data: result.rows,
            meta: {
                page: Number(page),
                limit: Number(limit),
                totalItems,
                totalPages,
            },
        };
    });
}
// Read One
// async function GetOne(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { search } = req.params;
//     const result = await db.query("SELECT * FROM inventory WHERE id = $1", [
//       search,
//     ]);
//     if (result.rows.length === 0) {
//       const error = new Error("Inventory item not found") as CustomError;
//       error.status = 404;
//       throw error;
//     }
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     next(error);
//   }
// }
// Update
function Update(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { id } = req.params;
        const { goods_name, action } = req.body;
        const goods_quantity = Number(req.body.goods_quantity);
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            const error = new Error("Unauthorized");
            error.status = 401;
            throw error;
        }
        const normalizedName = goods_name === null || goods_name === void 0 ? void 0 : goods_name.trim().replace(/\s+/g, " ");
        if (!goods_quantity || !["incoming", "outgoing"].includes(action)) {
            const error = new Error("Invalid action or quantity");
            error.status = 400;
            throw error;
        }
        const existing = yield database_1.db.query("SELECT * FROM inventory WHERE id = $1 AND is_deleted = FALSE", [id]);
        if (existing.rows.length === 0) {
            const error = new Error("Inventory item not found");
            error.status = 404;
            throw error;
        }
        const current = existing.rows[0];
        let newQuantity;
        if (action === "incoming") {
            newQuantity = Number(current.goods_quantity) + goods_quantity;
            // console.log(typeof newQuantity);
            // console.log(typeof current.goods_quantity);
            // console.log(typeof goods_quantity);
        }
        else {
            // outgoing
            if (goods_quantity > current.goods_quantity) {
                const error = new Error("Not enough stock to deduct");
                error.status = 400;
                throw error;
            }
            newQuantity = current.goods_quantity - goods_quantity;
            // console.log(typeof newQuantity);
        }
        const updateQuery = `
    UPDATE inventory
    SET goods_name = $1,
        goods_quantity = $2,
        updated_at = now()
    WHERE id = $3
  `;
        yield database_1.db.query(updateQuery, [
            normalizedName || current.goods_name,
            newQuantity,
            id,
        ]);
        const logQuery = `
    INSERT INTO inventory_logs (goods_id, user_id, action, quantity_changed)
    VALUES ($1, $2, $3, $4)
  `;
        yield database_1.db.query(logQuery, [id, userId, action, goods_quantity]);
        return {
            message: `Inventory ${action} recorded`,
            inventory_id: id,
            new_quantity: newQuantity,
        };
    });
}
// Delete
function Delete(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const exists = yield database_1.db.query(`SELECT * FROM inventory WHERE id = $1 AND is_deleted = false`, [id]);
        if (exists.rows.length === 0) {
            const error = new Error("Inventory item not found or already deleted");
            error.status = 404;
            throw error;
        }
        yield database_1.db.query(`UPDATE inventory SET is_deleted = true, updated_at = now() WHERE id = $1`, [id]);
        return {
            message: "Inventory SOFT-DELETED successfully",
        };
    });
}
