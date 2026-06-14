import { CreatePaymentDto } from "#domain/dtos/stripe/createPayment.dto.js";
import { createPaymentService } from "#services/stripe/createPayment.service.js";
import { ok } from "#utils/returnSucces.js";
import { NextFunction, Request, Response } from "express";

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const [dto, error] = CreatePaymentDto.create(req.body);

        if (error) {
            return next(new Error(error.message));
        }

        console.log(dto);

        const data = await createPaymentService(dto!);
        console.log(data);

        ok(res, data, 200, "Payment created successfully");
    } catch (error) {
        console.log(error);
        next(error);
    }
};