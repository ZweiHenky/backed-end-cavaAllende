import { Router } from "express";
import { updateStatus } from "#controllers/purchases/updateStatus.controller.js";
import { getByStatus } from "#controllers/purchases/getByStatus.controller.js";
import { getDetail } from "#controllers/purchases/getDetail.controller.js";
import { getToday } from "#controllers/purchases/getToday.controller.js";

const router = Router();

router.patch("/status/:id", updateStatus);
router.get("/search", getByStatus);
router.get("/today", getToday);
router.get("/:id", getDetail);

export default router;
