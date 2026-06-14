import { Request, Response, NextFunction } from "express";
import { transferPayoutService } from "#services/payoutsDeliveries/transferPayout.service.js";
import { ok } from "#utils/returnSucces.js";

export const transferPayout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, amount } = req.body;

        if (!user_id || amount === undefined) {
            return res.status(400).json({
                status: 400,
                message: "user_id y amount son requeridos"
            });
        }

        const result = await transferPayoutService(user_id, amount);

        ok(res, result, 201, "Transferencia y pago creados exitosamente");
    } catch (error) {
        next(error);
    }
};
