import { Router } from "express";
import {
  GetAllUser,
  LoginUser,
  RegisterUser,
  TestController,
} from "./user.controller";

const router = Router();

/**
 * @swagger
 * api/v1/admin/test:
 *   get:
 *     summary: Sample test route
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A success test response
 *
 * api/v1/admin/data:
 *   get:
 *     summary: Sample test route
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A success test response
 */

router.get("/test", TestController);

router.get("/data", GetAllUser);

router.post("/register", RegisterUser);

router.post("/login", LoginUser);

export default router;
