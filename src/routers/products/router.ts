import { Router } from "express";
import { getProducts, getProductsByCategory, getProductById } from "@/controllers/products/getProducts.js";
import { createProductController } from "@/controllers/products/createProduct.js";

const routerProducts = Router();

routerProducts.get("/", getProducts);
routerProducts.get("/category/:category_id", getProductsByCategory);
routerProducts.get("/:id", getProductById);
routerProducts.post("/", createProductController);

export default routerProducts;
