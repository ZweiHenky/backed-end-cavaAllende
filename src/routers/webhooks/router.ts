import { Router } from "express";
import { stripeWebhook } from "#controllers/webhooks/stripeWebhook.js";
import { connectWebhook } from "#controllers/webhooks/connectWebhook.js";

const routerWebhooks = Router();

routerWebhooks.post("/stripe", stripeWebhook);

routerWebhooks.post('/stripe/connect', connectWebhook)

export default routerWebhooks;
