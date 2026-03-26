import { getProductByIdModel } from "#models/products/getProducts.model.js";

export const getProductByIdService = async (id: number) => {
    return await getProductByIdModel(id);
};
