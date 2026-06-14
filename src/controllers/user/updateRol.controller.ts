import { updateRolService } from "#services/users/updateRol.service.js";
import { UpdateRolDto } from "#domain/dtos/users/updateRol.dto.js";
import { ok } from "#utils/returnSucces.js";
import { NextFunction, Request, Response } from "express";

export const updateRolController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const [updateRolDto, error] = UpdateRolDto.create(req.body);

        if (!userId) {
            return res.status(400).json({
                status: 400,
                message: "Valid userId is required"
            });
        }

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            });
        }

        const data = await updateRolService(userId as string, updateRolDto!.role);

        ok(res, data, 200, "User role updated successfully");
    } catch (error) {
        console.log(error);
        next(error);
    }
};
