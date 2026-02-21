import { Router } from "express";
import { stripeWebhook } from "#controllers/webhooks/stripeWebhook.js";

const routerWebhooks = Router();

routerWebhooks.post("/stripe", stripeWebhook);

export default routerWebhooks;
