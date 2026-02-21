import { Router } from "express";
import routerProducts from "./products/router.js";
import routerCategories from "./categories/router.js";
import routerStripe from "./stripe/routers.js";
import routerWebhooks from "./webhooks/router.js";

const router = Router();

router.use("/products", routerProducts);
router.use("/categories", routerCategories);
router.use("/stripe", routerStripe);
router.use("/webhooks", routerWebhooks);


export default router;

