import { NextFunction, Request, Response } from "express";
import { Add, Delete, GetAll, Update } from "./inventory.service";

async function AddGoods(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await Add(req);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

async function GetAllGoods(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await GetAll(req);

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

// async function GetAGoods(req: Request, res: Response, next: NextFunction) {
//   try {
//     const result = await GetOne(req, res, next);

//     res.status(200).send(result);
//   } catch (error) {
//     next(error);
//   }
// }

async function UpdateGoods(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await Update(req);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function DeleteGoods(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await Delete(req);

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}
export { AddGoods, GetAllGoods, UpdateGoods, DeleteGoods };
