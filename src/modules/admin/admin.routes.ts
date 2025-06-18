import { Router } from "express";
import { TestController } from "./admin.controller";

const router = Router();

router.get("/test", TestController);

export default router;
