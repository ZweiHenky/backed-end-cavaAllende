import { getUserByPhoneController } from "#controllers/user/getUserByPhone.js";
import { getStripeByUserIdController } from "#controllers/user/getStripeByUserId.controller.js";
import { Router } from "express";

const routerUsers = Router();

routerUsers.get("/phone/:phoneNumber", getUserByPhoneController);
routerUsers.get("/stripe/:userId", getStripeByUserIdController);

export default routerUsers;