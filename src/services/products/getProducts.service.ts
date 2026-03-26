import { getProductsModel } from "#models/products/getProducts.model.js";

export const getProductsService = async () => {
    return await getProductsModel();
};
