import { getUserByPhone } from "#models/users/getUSerByPhone.model.js";
import { ok } from "#utils/returnSucces.js";
import { NextFunction, Request, Response } from "express";

export const getUserByPhoneController = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.params;

    if (!phoneNumber) {
        return res.status(400).json({ message: "Phone number is required" });
    }

    try {
        // En PostgreSQL las comillas dobles mantienen el case-sensitivity para las columnas y tablas de better-auth
        const result = await getUserByPhone(phoneNumber);

        if (result.length === 0) {
            return ok(res, [], 200, "User not found");
        }

        ok(res, result, 200, "User found");
    } catch (error) {
        
        next(error);
    }
};
