import { Router } from "express";
import { createPayout } from "#controllers/payoutsDeliveries/createPayout.controller.js";
import { transferPayout } from "#controllers/payoutsDeliveries/transferPayout.controller.js";

const router = Router();

router.post("/", createPayout);
router.post("/transfer", transferPayout);

export default router;
