import { Router } from "express";
import { getAllCategories } from "@/controllers/categories/getCategories.js";

const routerCategories = Router();

routerCategories.get("/", getAllCategories);

export default routerCategories;
