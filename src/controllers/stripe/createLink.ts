import { CreateLinkDto } from "#domain/dtos/stripe/createLink.dto.js";
import { createLinkService } from "#services/stripe/createLink.service.js";
import { ok } from "#utils/returnSucces.js";
import { NextFunction, Request, Response } from "express";

export const createLinkConnect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = CreateLinkDto.create(req.body);

        if (error) {
            return res.status(400).json({ 
                status: 400,
                message: error.message 
            });
        }

        const data = await createLinkService(dto!);

        ok(res, data, 200, "Link created successfully");
    } catch (error) {
        console.log(error);
        next(error);
    }
};
