import { Request, Response, NextFunction } from "express";
import { getActivePurchaseByDeliveryService } from "#services/purchases/getActivePurchaseByDelivery.service.js";
import { ok } from "#utils/returnSucces.js";

export const getActivePurchaseByDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { delivery_id } = req.params;

        if (!delivery_id) {
            return res.status(400).json({
                status: 400,
                message: "delivery_id param is required",
            });
        }

        const purchase = await getActivePurchaseByDeliveryService(delivery_id);

        // Returns the active purchase or null if none found
        ok(res, purchase, 200, "Active purchase retrieved successfully");
    } catch (error) {
        next(error);
    }
};
