import { updatePurchaseStatusModel } from "#models/purchases/updatePurchaseStatus.model.js";
import { getIo } from "#socket/initSocket.js";
import { sendChangeStatus } from "#socket/events/purchases/sendChangeStatus.js";
import { sendPush } from "#api/oneSignal/client/sendPush.js";
import { createRefiynd } from "#config/stripe/refounds/createRefound.js";
import { pushCancelOrder } from "#api/oneSignal/client/pushCancelOrder.js";

export const updatePurchaseStatusService = async (status: string, id: number) => {

    const io = getIo();

    const result = await updatePurchaseStatusModel(status, id);

    if (!result.user_id) {
        return result;
    }

    sendChangeStatus(io, id.toString(), status, result.user_id);

    switch (status) {
        case "on_the_way":
            sendPush("Compra en camino", `Tu compra #${result.purchase_id} ha sido enviada`, result.user_id, id.toString());
            break;
        case "completed":
            sendPush("Compra finalizada", `Tu compra #${result.purchase_id} ha sido finalizada`, result.user_id, id.toString());
            break;
        case "cancelled":
            const refund = await createRefiynd(result.payment_reference!);
            if (refund.status === "succeeded") {
                pushCancelOrder("Compra cancelada", `Tu compra #${result.purchase_id} ha sido cancelada, reembolso en proceso`, result.user_id, id.toString());
            }
            break;
    }

    return result;
};
