import { updatePurchaseDeliveryIdModel } from "#models/purchases/updatePurchaseDeliveryId.model.js";

export const assignDeliveryService = async (delivery_id: string, id: number) => {
    return await updatePurchaseDeliveryIdModel(delivery_id, id, "accepted");
};
