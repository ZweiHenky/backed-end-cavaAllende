import { Request, Response, NextFunction } from "express";
import { getBalanceService } from "#services/stripe/getBalance.service.js";
import { ok } from "#utils/returnSucces.js";

export const getBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accountId = req.params.accountId;

        if (!accountId) {
            return res.status(400).json({
                status: 400,
                message: "AccountId es requerido"
            });
        }

        const data = await getBalanceService(accountId as string);

        ok(res, data, 200, "Balance de Stripe obtenido exitosamente");
    } catch (error) {
        console.error(error);
        next(error);
    }
};
