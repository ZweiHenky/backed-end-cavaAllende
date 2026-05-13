import { Router } from "express";
import { createEarning } from "#controllers/earningsDeliveries/createEarning.controller.js";
import { getEarningsSummary } from "#controllers/earningsDeliveries/getEarningsSummary.controller.js";

const router = Router();

router.post("/", createEarning);
router.get("/summary/:user_id", getEarningsSummary);

export default router;
