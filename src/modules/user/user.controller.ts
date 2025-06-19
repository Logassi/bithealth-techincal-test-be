import { NextFunction, Request, Response } from "express";
import { GetAllUserData, Login, Register, TestService } from "./user.service";

async function TestController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await TestService();

    res.status(200).send(result);
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

async function GetAllUser(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await GetAllUserData();

    res.status(200).send(result);
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

async function RegisterUser(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await Register(req);

    res.status(201).send(result);
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

async function LoginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await Login(req);

    res.status(200).send(result);
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

export { TestController, GetAllUser, RegisterUser, LoginUser };
