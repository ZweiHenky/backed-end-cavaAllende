import { Request, Response, NextFunction } from "express";
import { getPurchaseDetailService } from "#services/purchases/getPurchaseDetail.service.js";
import { GetPurchaseDetailDto } from "#domain/dtos/purchases/getPurchaseDetail.dto.js";
import { ok } from "#utils/returnSucces.js";

export const getDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = GetPurchaseDetailDto.create(req.params);

        if (error) {
            return res.status(400).json({ 
                status: 400,
                message: error.message 
            });
        }

        const purchaseDetail = await getPurchaseDetailService(dto!.id);

        if (!purchaseDetail) {
            return res.status(404).json({ 
                status: 404,
                message: "Purchase not found" 
            });
        }

        ok(res, purchaseDetail, 200, "Purchase detail retrieved successfully");
    } catch (error) {
        next(error);
    }
};
