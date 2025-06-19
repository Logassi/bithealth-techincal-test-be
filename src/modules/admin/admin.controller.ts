import { NextFunction, Request, Response } from "express";
import { GetAllAdminData, Register, TestService } from "./admin.service";

async function TestController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await TestService();

    res.status(200).send(result);
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

async function GetAllAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await GetAllAdminData();

    res.status(200).send(result);
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

async function RegisterAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await Register(req);

    res.status(201).send(result);
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

export { TestController, GetAllAdmin, RegisterAdmin };
