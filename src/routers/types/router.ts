import { Router } from "express";
import { getAllTypes } from "@/controllers/types/getTypes.js";

const routerTypes = Router();

routerTypes.get("/", getAllTypes);

export default routerTypes;
