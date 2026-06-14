import { Router } from "express";
import { getProducts, getProductsByCategory, getProductById, searchProductsByName, validateStock } from "@/controllers/products/getProducts.js";
import { createProductController } from "@/controllers/products/createProduct.js";
import { updateProductController } from "@/controllers/products/updateProduct.js";

const routerProducts = Router();

routerProducts.get("/", getProducts);
routerProducts.get("/search", searchProductsByName);
routerProducts.post("/validate-stock", validateStock);
routerProducts.get("/category", getProductsByCategory);
routerProducts.get("/:id", getProductById);
routerProducts.patch("/:id", updateProductController);
routerProducts.post("/", createProductController);

export default routerProducts;
