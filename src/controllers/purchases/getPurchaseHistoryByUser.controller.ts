import { Request, Response, NextFunction } from "express";
import { getPurchaseHistoryByUserService } from "#services/purchases/getPurchaseHistoryByUser.service.js";
import { ok } from "#utils/returnSucces.js";

export const getPurchaseHistoryByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({
                status: 400,
                message: "user_id param is required",
            });
        }

        const purchases = await getPurchaseHistoryByUserService(user_id);

        ok(res, purchases, 200, "Purchase history retrieved successfully");
    } catch (error) {
        next(error);
    }
};
