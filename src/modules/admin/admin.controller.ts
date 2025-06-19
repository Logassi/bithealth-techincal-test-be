import { NextFunction, Request, Response } from "express";
import { TestService } from "./admin.service";

async function TestController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await TestService();

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
}

export { TestController };
