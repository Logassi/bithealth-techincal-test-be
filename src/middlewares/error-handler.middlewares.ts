import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types/error";

export default function ErrorMiddleware(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status ?? 500;
  const message = err.message || "Internal Server Error";

  res.status(status).send({
    success: false,
    status,
    message,
  });
}
