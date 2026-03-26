import { CreatePaymentDto } from "#domain/dtos/stripe/createPayment.dto.js";
import { createPaymentService } from "#services/stripe/createPayment.service.js";
import { ok } from "#utils/returnSucces.js";
import { NextFunction, Request, Response } from "express";

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = CreatePaymentDto.create(req.body);

        if (error) {
            return res.status(400).json({ 
                status: 400,
                message: error.message 
            });
        }

        const data = await createPaymentService(dto!);

        ok(res, data, 200, "Payment created successfully");
    } catch (error) {
        console.log(error);
        next(error);
    }
};