import { updatePurchaseStatusModel } from "#models/purchases/updatePurchaseStatus.model.js";

export const updatePurchaseStatusService = async (id: string, status: string) => {
    return await updatePurchaseStatusModel(id, status);
};
