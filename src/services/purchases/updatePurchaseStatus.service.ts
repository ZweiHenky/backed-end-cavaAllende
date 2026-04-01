import { updatePurchaseStatusModel } from "#models/purchases/updatePurchaseStatus.model.js";

export const updatePurchaseStatusService = async (status: string, id: number) => {
    return await updatePurchaseStatusModel(status, id);
};
