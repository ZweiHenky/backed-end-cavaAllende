import { Request, Response, NextFunction } from "express";
import { getPurchasesTodayService } from "#services/purchases/getPurchasesToday.service.js";
import { ok } from "#utils/returnSucces.js";

export const getToday = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const purchases = await getPurchasesTodayService();
        ok(res, purchases, 200, "Today's purchases retrieved successfully");
    } catch (error) {
        next(error);
    }
};
