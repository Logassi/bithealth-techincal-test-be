import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types/error";
import { JwtPayload } from "../utils/jwt";
import { User } from "../types/custom";

// Accept one or more allowed roles
export function RoleGuard(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as User;
      if (!user || !user.role) {
        const error = new Error("Unauthorized: No role found") as CustomError;
        error.status = 403;
        throw error;
      }

      if (!allowedRoles.includes(user.role)) {
        const error = new Error("Forbidden: Access denied") as CustomError;
        error.status = 403;
        throw error;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
