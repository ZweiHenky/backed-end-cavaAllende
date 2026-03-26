import { getAllTypesModel } from "#models/types/getTypes.model.js";

export const getTypesService = async () => {
    return await getAllTypesModel();
};
