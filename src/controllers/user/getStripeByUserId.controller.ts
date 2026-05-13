import { getStripeByUserIdService } from "#services/users/getStripeByUserId.service.js";
import { ok } from "#utils/returnSucces.js";
import { NextFunction, Request, Response } from "express";

export const getStripeByUserIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({
                status: 400,
                message: "Valid userId is required"
            });
        }

        const data = await getStripeByUserIdService(userId);

        ok(res, data, 200, "Stripe account retrieved successfully");
    } catch (error) {
        console.log(error);
        next(error);
    }
};
