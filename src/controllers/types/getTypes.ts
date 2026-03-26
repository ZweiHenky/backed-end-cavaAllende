import { getTypesService } from "#services/types/getTypes.service.js"
import { ok } from "#utils/returnSucces.js"
import { Request, Response, NextFunction } from "express"

export const getAllTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const types = await getTypesService()
        ok(res, types, 200, "Types retrieved successfully")
    } catch (error) {
        next(error)
    }
}
