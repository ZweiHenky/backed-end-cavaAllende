import { Request, Response, NextFunction } from "express";
import { getConnectAccountService } from "#services/stripe/getConnectAccount.service.js";
import { ok } from "#utils/returnSucces.js";

export const getConnectAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accountId } = req.params;

        if (!accountId) {
            return res.status(400).json({
                status: 400,
                message: "accountId is required"
            });
        }

        const data = await getConnectAccountService(accountId);

        ok(res, data, 200, "Connect account retrieved successfully");
    } catch (error) {
        console.error(error);
        next(error);
    }
};
