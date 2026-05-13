import { Request, Response, NextFunction } from "express";
import { updateStripeStatus } from "#models/stripe/updateStatus.js";
import { ok } from "#utils/returnSucces.js";

export const updateConnectAccountStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accountId } = req.params;

        if (!accountId) {
            return res.status(400).json({
                status: 400,
                message: "accountId is required"
            });
        }

        const data = await updateStripeStatus(accountId);

        if (!data) {
            return res.status(404).json({
                status: 404,
                message: "Stripe account not found"
            });
        }

        ok(res, data, 200, "Stripe account status updated to active successfully");
    } catch (error) {
        console.error(error);
        next(error);
    }
};
