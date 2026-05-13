import { sendPush } from "#api/oneSignal/client/sendPush.js";
import { pushNewOrderDelivery } from "#api/oneSignal/delivery/pushNewOrderDelivery.js";
import { getPurchaseById } from "#models/purchases/getById.js";
import { updateStatusAndPaymentId } from "#models/purchases/updateStatusAndPaymentId.js";
import { addCharge } from "#utils/purchases/chargeInProcess.js";
import Stripe from "stripe";

export const processSuccessfulPaymentService = async (paymentIntent: Stripe.PaymentIntent) => {
    const userId = paymentIntent.metadata?.userId;
    const orderId = paymentIntent.metadata?.order_id;

    if (!userId || !orderId) {
        throw new Error("Metadata not found");
    }

    const purchase = await getPurchaseById(Number(orderId));
    
    if (purchase?.purchase_id) {
        const res = await updateStatusAndPaymentId(Number(purchase.purchase_id), "paid", paymentIntent.id);
        
        if (res) {
            sendPush("Compra realizada", `Tu compra #${purchase.purchase_id} ha sido realizada`, purchase.user_id!, purchase.purchase_id!);
            pushNewOrderDelivery("Nueva compra", `Nueva compra realizada por ${res.user_id}`, res.purchase_id!);

            return {
                success: true,
                purchase: res
            };
        }
    }else{
        throw new Error("Purchase not found");
    }

};
