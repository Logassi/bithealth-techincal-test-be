import { Router } from "express";
import { GetAllAdmin, RegisterAdmin, TestController } from "./admin.controller";

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

router.get("/data", GetAllAdmin);

router.post("/register", RegisterAdmin);

export default router;
