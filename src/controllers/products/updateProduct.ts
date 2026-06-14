import { updateProductService } from "#services/products/updateProduct.service.js"
import { NextFunction, Request, Response } from "express"
import { ok } from "#utils/returnSucces.js"
import { UpdateProductDto } from "#domain/dtos/products/updateProduct.dto.js"

export const updateProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [productDto, error] = UpdateProductDto.create(req.params.id as string, req.body)
        if (error) {
            throw error
        }
        
        const product = await updateProductService(productDto!)
        ok(res, product, 200, "Product updated successfully")
    } catch (error) {
        next(error)
    }
}
