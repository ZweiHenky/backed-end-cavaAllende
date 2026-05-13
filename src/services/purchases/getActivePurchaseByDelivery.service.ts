import { getActivePurchaseByDeliveryModel } from "#models/purchases/getActivePurchaseByDelivery.model.js";

export const getActivePurchaseByDeliveryService = async (deliveryId: string) => {
    const purchase = await getActivePurchaseByDeliveryModel(deliveryId);
    return purchase;
};
