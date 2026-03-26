import { getProductsByCategoryPaginationModel } from "#models/products/getProducts.model.js";

export const getProductsByCategoryService = async (
    category_id: number, 
    limit: number, 
    offset: number, 
    typeId?: number
) => {
    return await getProductsByCategoryPaginationModel(category_id, limit, offset, typeId);
};
