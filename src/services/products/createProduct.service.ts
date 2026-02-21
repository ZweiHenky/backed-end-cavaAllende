import { ProductInterface } from "#domain/interfaces/product.interface.js"
import { createProductModel } from "#models/products/createProduct.model.js"
import {CreateProductDto} from "#domain/dtos/createProduct.dto.js"
import { AppError } from "#config/AppError.js"

export const createProductService = async (data: ProductInterface) => {

    const [product, error] = CreateProductDto.create(data)

    if (error) {
        throw new AppError(error.message, 400)
    }
    
    const res = await createProductModel(product!)
    return res
}