import { Request, Response, NextFunction } from "express";
import { getPurchasesByStatusService } from "#services/purchases/getPurchasesByStatus.service.js";
import { GetPurchasesByStatusDto } from "#domain/dtos/purchases/getPurchasesByStatus.dto.js";
import { ok } from "#utils/returnSucces.js";

export const getByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = GetPurchasesByStatusDto.create(req.query);

        if (error) {
            return res.status(400).json({ 
                status: 400,
                message: error.message 
            });
        }

        // Support both single status and comma-separated status
        const statuses = dto!.status.split(",");

        const purchases = await getPurchasesByStatusService(statuses, dto!.user_id);

        ok(res, purchases, 200, "Purchases retrieved successfully");
    } catch (error) {
        next(error);
    }
};
