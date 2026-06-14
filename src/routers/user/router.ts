import { getUserByPhoneController } from "#controllers/user/getUserByPhone.js";
import { getStripeByUserIdController } from "#controllers/user/getStripeByUserId.controller.js";
import { updateRolController } from "#controllers/user/updateRol.controller.js";
import { Router } from "express";

const routerUsers = Router();

routerUsers.get("/phone/:phoneNumber", getUserByPhoneController);
routerUsers.get("/stripe/:userId", getStripeByUserIdController);
routerUsers.patch("/:userId/role", updateRolController);

export default routerUsers;