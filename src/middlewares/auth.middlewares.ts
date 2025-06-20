// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { CustomError } from "../types/error";
import { db } from "../configs/database";

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Unauthorized: No token provided") as CustomError;
      error.status = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    // Optional: If token only contains email or userId, fetch full user
    const userResult = await db.query("SELECT id FROM users WHERE email = $1", [
      decoded.email,
    ]);

    if (userResult.rows.length === 0) {
      const error = new Error("User not found") as CustomError;
      error.status = 401;
      throw error;
    }

    req.user = {
      ...decoded,
      id: userResult.rows[0].id,
    };

    next();
  } catch (error) {
    next(error);
  }
}
