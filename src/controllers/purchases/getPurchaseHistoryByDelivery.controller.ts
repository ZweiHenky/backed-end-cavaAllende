import { Request, Response, NextFunction } from "express";
import { getPurchaseHistoryByDeliveryService } from "#services/purchases/getPurchaseHistoryByDelivery.service.js";
import { ok } from "#utils/returnSucces.js";

export const getPurchaseHistoryByDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { delivery_id } = req.params;

        if (!delivery_id) {
            return res.status(400).json({
                status: 400,
                message: "delivery_id param is required",
            });
        }

        const purchases = await getPurchaseHistoryByDeliveryService(delivery_id as string);

        ok(res, purchases, 200, "Purchase history retrieved successfully");
    } catch (error) {
        next(error);
    }
};
