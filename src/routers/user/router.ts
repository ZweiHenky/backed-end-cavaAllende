import { getUserByPhoneController } from "#controllers/user/getUserByPhone.js";
import { Router } from "express";


const routerUsers = Router();

routerUsers.get("/phone/:phoneNumber", getUserByPhoneController);

export default routerUsers;