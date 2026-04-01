import { Request, Response, NextFunction } from "express";
import { assignDeliveryService } from "#services/purchases/assignDelivery.service.js";
import { AssignDeliveryDto } from "#domain/dtos/purchases/assignDelivery.dto.js";
import { ok } from "#utils/returnSucces.js";

export const assignDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = AssignDeliveryDto.create({ ...req.body, id: Number(req.params.id) });

        if (error) {
            return res.status(400).json({ 
                status: 400,
                message: error.message 
            });
        }

        const purchase = await assignDeliveryService(dto!.delivery_id, dto!.id);

        if (!purchase) {
            return res.status(404).json({ 
                status: 404,
                message: "Purchase not found" 
            });
        }

        ok(res, purchase, 200, "Delivery assigned successfully");
    } catch (error) {
        next(error);
    }
};
