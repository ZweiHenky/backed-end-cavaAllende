import { createProductService } from "#services/products/createProduct.service.js"
import { NextFunction, Request, Response } from "express"
import { ok } from "#utils/returnSucces.js"

export const createProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await createProductService(req.body)
        ok(res, product, 201, "Product created successfully")
    } catch (error) {
        next(error)
    }
}