import { Router } from "express";
import userRoutes from "../../modules/user/user.routes";
import inventoryRoutes from "../../modules/inventory/inventory.routes";

const router = Router();

router.use("/user", userRoutes);

router.use("/inventory", inventoryRoutes);

export default router;
