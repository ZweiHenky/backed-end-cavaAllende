import { getPurchaseHistoryByUserModel } from "#models/purchases/getPurchaseHistoryByUser.model.js";
import { PurchaseEntity } from "#domain/entities/purchases.entity.js";

export const getPurchaseHistoryByUserService = async (userId: string): Promise<PurchaseEntity[]> => {
    const purchases = await getPurchaseHistoryByUserModel(userId);
    return purchases as PurchaseEntity[];
};
