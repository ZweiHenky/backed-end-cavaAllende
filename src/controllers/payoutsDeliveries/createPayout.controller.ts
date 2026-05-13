import { Request, Response, NextFunction } from "express";
import { addPayoutService } from "#services/payoutsDeliveries/addPayout.service.js";
import { CreatePayoutDto } from "#domain/dtos/payoutsDeliveries/createPayout.dto.js";
import { ok } from "#utils/returnSucces.js";

export const createPayout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = CreatePayoutDto.create(req.body);

        if (error) {
            return res.status(400).json({ 
                status: 400,
                message: error.message 
            });
        }

        const payout = await addPayoutService(dto!);

        ok(res, payout, 201, "Payout created successfully");
    } catch (error) {
        next(error);
    }
};
