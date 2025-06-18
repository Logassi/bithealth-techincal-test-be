import { NextFunction, Request, Response } from "express";

async function TestController(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).send({
      message: "Test",
    });
  } catch (error) {
    console.log(error);
  }
}

export { TestController };
