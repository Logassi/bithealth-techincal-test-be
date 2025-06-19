import { Router } from "express";
import adminRoutes from "../../modules/admin/admin.routes";

const router = Router();

router.use("/admin", adminRoutes);

export default router;
