import { searchProductsByNameModel } from "#models/products/getProducts.model.js";

export const searchProductsByNameService = async (
    name: string, 
    limit: number, 
    offset: number, 
    typeId?: number
) => {
    return await searchProductsByNameModel(name, limit, offset, typeId);
};
