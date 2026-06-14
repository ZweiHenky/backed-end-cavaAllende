import { updatePurchaseStatusModel } from "#models/purchases/updatePurchaseStatus.model.js";
import { getIo } from "#socket/initSocket.js";
import { sendChangeStatus } from "#socket/events/purchases/sendChangeStatus.js";
import { sendPush } from "#api/oneSignal/client/sendPush.js";
import { createRefiynd } from "#config/stripe/refounds/createRefound.js";
import { pushCancelOrder } from "#api/oneSignal/client/pushCancelOrder.js";
import { pushNewOrderDelivery } from "#api/oneSignal/delivery/pushNewOrderDelivery.js";
import { getPurchaseById } from "#models/purchases/getById.js";
import { addEarningModel } from "#models/earningsDeliveries/addEarning.model.js";
import { CreateEarningDto } from "#domain/dtos/earningsDeliveries/createEarning.dto.js";

export const updatePurchaseStatusService = async (status: string, id: number) => {

    const io = getIo();

    const oldPurchase = await getPurchaseById(id);

    if (!oldPurchase?.purchase_id) {
        throw new Error("Compra no encontrada");
    }

    const result = await updatePurchaseStatusModel(status, id);

    if (!result.user_id) {
        throw new Error("Usuario no encontrado para la compra");
    }

    sendChangeStatus(io, id.toString(), status, result.user_id);

    switch (status) {
        case "accepted":
            pushNewOrderDelivery("Nuevo pedido", `Nuevo pedido en espera de recoleccion`, result.user_id);
            sendPush("Preparando tu pedido...", `Tu pedido ha sido aceptado`, result.user_id, id.toString());
            break;
        case "collecting":
            sendPush("Compra recogida", `Tu compra ha sido recogida por el repartidor`, result.user_id, id.toString());
            break;
        case "on_the_way":
            sendPush("Compra en camino", `Tu compra ha sido enviada`, result.user_id, id.toString());
            break;
        case "completed":
            sendPush("Compra finalizada", `Tu compra ha sido finalizada`, result.user_id, id.toString());
            break;
        case "cancelled":
            if (!oldPurchase.payment_reference) {
                break;
            }

            let shipping_cost_refund = 0;
            if (oldPurchase.status === "collecting") {
               shipping_cost_refund = oldPurchase.total - (oldPurchase.shipping_cost! * 0.50);
            }else{
                shipping_cost_refund = oldPurchase.total;
            }

            const refund = await createRefiynd(oldPurchase.payment_reference, shipping_cost_refund * 100);

            if (refund.status === "succeeded") {
                if (oldPurchase.status == "collecting") {
                    const dataEarning: CreateEarningDto = {
                        purchase_id: Number(oldPurchase.purchase_id),
                        user_id: oldPurchase.delivery_id!.toString(),
                        amount: oldPurchase.shipping_cost! * 0.50,
                        type: "delivery",
                        status: "pending"
                    }
                    const res = await addEarningModel(dataEarning);

                    if (!res) {
                        throw new Error("Error al agregar la ganancia despues de que el cliente cancele");
                    }
                }
                pushCancelOrder("Compra cancelada", `Tu compra ha sido cancelada, reembolso en proceso`, result.user_id, id.toString());
            } else {
                pushCancelOrder("Compra cancelada", `Tu compra ha sido cancelada, reembolso fallido, por favor contacta al soporte`, result.user_id, id.toString());
            }
            break;
    }

    return result;
};
