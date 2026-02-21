import { Router } from "express";
import { createPayment } from "#controllers/stripe/createPayment.js";

const routerStripe = Router();

routerStripe.post("/create-payment-sheet", createPayment)

export default routerStripe;

