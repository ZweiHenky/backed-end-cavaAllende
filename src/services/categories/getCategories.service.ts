import { getAllCategoriesModel } from "#models/categories/getCategories.model.js";

export const getCategoriesService = async () => {
    return await getAllCategoriesModel();
};
