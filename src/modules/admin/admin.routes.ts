import { Router } from "express";
import { TestController } from "./admin.controller";

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
 */

router.get("/test", TestController);

export default router;
