import { getPurchasesByStatusModel } from "#models/purchases/getPurchasesByStatus.model.js";
import { PurchaseEntity } from "#domain/entities/purchases.entity.js";

export const getPurchasesByStatusService = async (statuses: string[], user_id: string): Promise<PurchaseEntity[]> => {
    const purchases = await getPurchasesByStatusModel(statuses, user_id);

    return purchases as PurchaseEntity[];
};
