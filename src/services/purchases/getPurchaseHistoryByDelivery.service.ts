import { getPurchaseHistoryByDeliveryModel } from "#models/purchases/getPurchaseHistoryByDelivery.model.js";
import { PurchaseEntity } from "#domain/entities/purchases.entity.js";

export const getPurchaseHistoryByDeliveryService = async (deliveryId: string): Promise<PurchaseEntity[]> => {
    const purchases = await getPurchaseHistoryByDeliveryModel(deliveryId);
    return purchases as PurchaseEntity[];
};
