import { RetryConnectLinkDto } from "#domain/dtos/stripe/retryConnectLink.dto.js";
import { retryConnectLinkService } from "#services/stripe/retryConnectLink.service.js";
import { ok } from "#utils/returnSucces.js";
import { NextFunction, Request, Response } from "express";

export const retryConnectLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = RetryConnectLinkDto.create(req.body);

        if (error) {
            return res.status(400).json({ 
                status: 400,
                message: error.message 
            });
        }

        const data = await retryConnectLinkService(dto!);

        ok(res, data, 200, "Connect onboarding link generated successfully");
    } catch (error) {
        console.log(error);
        next(error);
    }
};
