import { NextFunction, Request, Response } from "express";
import { db } from "../../configs/database";
import { CustomError } from "../../types/error";

async function Add(req: Request) {
  const { goods_name, goods_quantity }: AddGoodsDto = req.body;
  const userId = req.user?.id; // Ensure middleware attaches `user` to req

  if (!userId) {
    const error = new Error("Unauthorized - no user ID found") as CustomError;
    error.status = 401;
    throw error;
  }

  const normalizedName = goods_name.trim().replace(/\s+/g, " ");

  const exists = await db.query(
    `SELECT id FROM inventory WHERE LOWER(goods_name) = LOWER($1) AND is_deleted = false`,
    [normalizedName]
  );

  if (exists.rows.length > 0) {
    const error = new Error(
      "Item with the same name already exists"
    ) as CustomError;
    error.status = 409; // Conflict
    throw error;
  }

  // 1. Insert into inventory
  const insertInventoryQuery = `
      INSERT INTO inventory (goods_name, goods_quantity, create_by)
      VALUES ($1, $2, $3)
      RETURNING id
    `;

  const inventoryResult = await db.query(insertInventoryQuery, [
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

  await db.query(insertLogQuery, [inventoryId, userId, goods_quantity]);

  return {
    message: "Goods added successfully",
    inventory_id: inventoryId,
  };

  // 3. Return response
  // res.status(201).json({
  //   message: "Goods added successfully",
  //   inventory_id: inventoryId,
  // });
}

// Read All
async function GetAll(req: Request): Promise<{
  data: any[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}> {
  const { page = 1, limit = 10, search = "" }: GetAllGoodsDto = req.query;

  const offset = (Number(page) - 1) * Number(limit);
  const searchQuery = `%${search.toLowerCase()}%`;

  const dataQuery = `
    SELECT * FROM inventory
    WHERE LOWER(goods_name) LIKE $1 AND is_deleted = FALSE
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;

  const result = await db.query(dataQuery, [searchQuery, limit, offset]);

  const countQuery = `
    SELECT COUNT(*) FROM inventory
    WHERE LOWER(goods_name) LIKE $1 AND is_deleted = FALSE
  `;
  const countResult = await db.query(countQuery, [searchQuery]);

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
async function Update(req: Request) {
  const { id } = req.params;
  const { goods_name, action }: UpdateGoodsDto = req.body;
  const goods_quantity = Number(req.body.goods_quantity);

  const userId = req.user?.id;

  if (!userId) {
    const error = new Error("Unauthorized") as CustomError;
    error.status = 401;
    throw error;
  }

  const normalizedName = goods_name?.trim().replace(/\s+/g, " ");

  if (!goods_quantity || !["incoming", "outgoing"].includes(action)) {
    const error = new Error("Invalid action or quantity") as CustomError;
    error.status = 400;
    throw error;
  }

  const existing = await db.query(
    "SELECT * FROM inventory WHERE id = $1 AND is_deleted = FALSE",
    [id]
  );
  if (existing.rows.length === 0) {
    const error = new Error("Inventory item not found") as CustomError;
    error.status = 404;
    throw error;
  }

  const current = existing.rows[0];
  let newQuantity: number;

  if (action === "incoming") {
    newQuantity = Number(current.goods_quantity) + goods_quantity;
    // console.log(typeof newQuantity);
    // console.log(typeof current.goods_quantity);
    // console.log(typeof goods_quantity);
  } else {
    // outgoing
    if (goods_quantity > current.goods_quantity) {
      const error = new Error("Not enough stock to deduct") as CustomError;
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
  await db.query(updateQuery, [
    normalizedName || current.goods_name,
    newQuantity,
    id,
  ]);

  const logQuery = `
    INSERT INTO inventory_logs (goods_id, user_id, action, quantity_changed)
    VALUES ($1, $2, $3, $4)
  `;
  await db.query(logQuery, [id, userId, action, goods_quantity]);

  return {
    message: `Inventory ${action} recorded`,
    inventory_id: id,
    new_quantity: newQuantity,
  };
}

// Delete
async function Delete(req: Request) {
  const { id } = req.params;

  const exists = await db.query(
    `SELECT * FROM inventory WHERE id = $1 AND is_deleted = false`,
    [id]
  );

  if (exists.rows.length === 0) {
    const error = new Error(
      "Inventory item not found or already deleted"
    ) as CustomError;
    error.status = 404;
    throw error;
  }

  await db.query(
    `UPDATE inventory SET is_deleted = true, updated_at = now() WHERE id = $1`,
    [id]
  );

  return {
    message: "Inventory SOFT-DELETED successfully",
  };
}
export { Add, GetAll, Update, Delete };
