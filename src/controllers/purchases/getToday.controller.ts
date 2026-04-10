import { Request, Response, NextFunction } from "express";
import { getPurchasesTodayService } from "#services/purchases/getPurchasesToday.service.js";
import { ok } from "#utils/returnSucces.js";

export const getToday = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.query;
        

        if(!status){
            res.status(400).json({ message: "Status is required" });
            return;
        }

        const statuses = (status as string).split(",");

        console.log(statuses);

        const purchases = await getPurchasesTodayService(statuses);
        ok(res, purchases, 200, "Today's purchases retrieved successfully");
    } catch (error) {
        next(error);
    }
};
