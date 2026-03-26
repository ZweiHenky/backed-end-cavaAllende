import { Request, Response, NextFunction } from "express";
import { updatePurchaseStatusService } from "#services/purchases/updatePurchaseStatus.service.js";
import { UpdatePurchaseStatusDto } from "#domain/dtos/purchases/updatePurchaseStatus.dto.js";
import { ok } from "#utils/returnSucces.js";

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = UpdatePurchaseStatusDto.create(req.params, req.body);

        if (error) {
            return res.status(400).json({ 
                status: 400,
                message: error.message 
            });
        }

        const purchase = await updatePurchaseStatusService(dto!.id, dto!.status);

        if (!purchase) {
            return res.status(404).json({ 
                status: 404,
                message: "Purchase not found" 
            });
        }

        ok(res, purchase, 200, "Purchase status updated successfully");
    } catch (error) {
        next(error);
    }
};
