import { CreateConnectAccountDto } from "#domain/dtos/stripe/createConnectAccount.dto.js";
import { createConnectAccountService } from "#services/stripe/createConnectAccount.service.js";
import { ok } from "#utils/returnSucces.js";
import { NextFunction, Request, Response } from "express";

export const createConnectAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = CreateConnectAccountDto.create(req.body);

        if (error) {
            return res.status(400).json({ 
                status: 400,
                message: error.message 
            });
        }

        const data = await createConnectAccountService(dto!);

        ok(res, data, 200, "Connect account created successfully");
    } catch (error) {
        console.log(error);
        next(error);
    }
};
