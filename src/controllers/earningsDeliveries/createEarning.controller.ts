import { Request, Response, NextFunction } from "express";
import { addEarningService } from "#services/earningsDeliveries/addEarning.service.js";
import { CreateEarningDto } from "#domain/dtos/earningsDeliveries/createEarning.dto.js";
import { ok } from "#utils/returnSucces.js";

export const createEarning = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = CreateEarningDto.create(req.body);

        if (error) {
            return res.status(400).json({ 
                status: 400,
                message: error.message 
            });
        }

        const earning = await addEarningService(dto!);

        ok(res, earning, 201, "Earning created successfully");
    } catch (error) {
        next(error);
    }
};
