import { updateProductModel } from "#models/products/updateProduct.model.js"
import { UpdateProductDto } from "#domain/dtos/products/updateProduct.dto.js"

export const updateProductService = async (dto: UpdateProductDto) => {
    const product = await updateProductModel(dto)
    return product
}
