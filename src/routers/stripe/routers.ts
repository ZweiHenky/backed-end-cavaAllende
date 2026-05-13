import { Router } from "express";
import { createPayment } from "#controllers/stripe/createPayment.js";
import { createConnectAccount } from "#controllers/stripe/createConnectAccount.js";
import { retryConnectLink } from "#controllers/stripe/retryConnectLink.js";
import { returnConnectLink } from "#controllers/stripe/returnConnectLink.js";
import { createLinkConnect } from "#controllers/stripe/createLink.js";
import { updateConnectAccountStatus } from "#controllers/stripe/updateStatus.js";
import { getConnectAccount } from "#controllers/stripe/getConnectAccount.js";

const routerStripe = Router();

routerStripe.post("/create-payment-sheet", createPayment);
routerStripe.post("/connect/createAccount", createConnectAccount);
routerStripe.post("/connect/retry", retryConnectLink);
routerStripe.get("/connect/return", returnConnectLink);
routerStripe.post("/connect/createLink", createLinkConnect);
routerStripe.patch("/connect/status/:accountId", updateConnectAccountStatus);
routerStripe.get("/connect/account/:accountId", getConnectAccount);

export default routerStripe;
