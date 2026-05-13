import { Request, Response, NextFunction } from "express";
import { getEarningsSummaryService } from "#services/earningsDeliveries/getEarningsSummary.service.js";
import { ok } from "#utils/returnSucces.js";

export const getEarningsSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.params.user_id;

        if (!user_id) {
            return res.status(400).json({ status: 400, message: "user_id is required" });
        }

        const summary = await getEarningsSummaryService(user_id);
        ok(res, summary, 200, "Earnings summary retrieved successfully");
    } catch (error) {
        next(error);
    }
};
