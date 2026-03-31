import { Router } from "express";
import routerProducts from "./products/router.js";
import routerCategories from "./categories/router.js";
import routerStripe from "./stripe/routers.js";
import routerWebhooks from "./webhooks/router.js";
import routerTypes from "./types/router.js";
import routerPurchases from "./purchases/router.js";
import routerUsers from "./user/router.js";

const router = Router();

router.use("/products", routerProducts);
router.use("/categories", routerCategories);
router.use("/stripe", routerStripe);
router.use("/webhooks", routerWebhooks);
router.use("/types", routerTypes);
router.use("/purchases", routerPurchases);
router.use("/users", routerUsers);


export default router;

