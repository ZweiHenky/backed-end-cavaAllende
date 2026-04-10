import { updatePurchaseDeliveryIdModel } from "#models/purchases/updatePurchaseDeliveryId.model.js";
import { sendChangeStatus } from "#socket/events/purchases/sendChangeStatus.js";
import { getIo } from "#socket/initSocket.js";
import { sendPush } from "#api/oneSignal/client/sendPush.js";

export const assignDeliveryService = async (delivery_id: string, id: number) => {

    const io = getIo();

    const result = await updatePurchaseDeliveryIdModel(delivery_id, id, "accepted");

    sendChangeStatus(io, id.toString(), "accepted", result.user_id.toString());

    if (!result.user_id) {
        return result;
    }

    sendPush("Compra aceptada", `Tu compra ${id} ha sido asignada a un repartidor`, result.user_id, id.toString());

    return result;
};
