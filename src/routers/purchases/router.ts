import { Router } from "express";
import { updateStatus } from "#controllers/purchases/updateStatus.controller.js";
import { assignDelivery } from "#controllers/purchases/assignDelivery.controller.js";
import { getByStatus } from "#controllers/purchases/getByStatus.controller.js";
import { getDetail } from "#controllers/purchases/getDetail.controller.js";
import { getToday } from "#controllers/purchases/getToday.controller.js";
import { getActivePurchaseByDelivery } from "#controllers/purchases/getActivePurchaseByDelivery.controller.js";
import { getPurchaseHistoryByUser } from "#controllers/purchases/getPurchaseHistoryByUser.controller.js";
import { getPurchaseHistoryByDelivery } from "#controllers/purchases/getPurchaseHistoryByDelivery.controller.js";

const router = Router();

router.patch("/status/:id", updateStatus);
router.patch("/assign-delivery/:id", assignDelivery);
router.get("/search", getByStatus);
router.get("/today", getToday);
router.get("/active/delivery/:delivery_id", getActivePurchaseByDelivery);
router.get("/history/user/:user_id", getPurchaseHistoryByUser);
router.get("/history/delivery/:delivery_id", getPurchaseHistoryByDelivery);
router.get("/:id", getDetail);

export default router;
