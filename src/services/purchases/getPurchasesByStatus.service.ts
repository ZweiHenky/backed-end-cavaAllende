import { getPurchasesByStatusModel } from "#models/purchases/getPurchasesByStatus.model.js";

export const getPurchasesByStatusService = async (statuses: string[], user_id: string) => {
    return await getPurchasesByStatusModel(statuses, user_id);
};
