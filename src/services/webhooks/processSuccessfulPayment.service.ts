import { sendPush } from "#api/oneSignal/client/sendPush.js";
import { processPurchaseTransaction } from "#models/purchases/processPurchaseTransaction.model.js";
import { pushNewOrderDelivery } from "#api/oneSignal/delivery/pushNewOrderDelivery.js";

export const processSuccessfulPaymentService = async (paymentIntent: any) => {
    const userId = paymentIntent.metadata?.userId;
    const orderStr = paymentIntent.metadata?.order;
    const locationStr = paymentIntent.metadata?.location;
    
    if (orderStr) {
        const order = JSON.parse(orderStr);
        const location = JSON.parse(locationStr);
        
        const purchaseData = {
            user_id: userId,
            subtotal: paymentIntent.amount / 100,
            total: paymentIntent.amount / 100,
            payment_method: "stripe",
            payment_reference: paymentIntent.id,
            status: "completed"
        };
        
        const result = await processPurchaseTransaction(purchaseData, order, location);

        if (result) {

            sendPush("Compra realizada", `Tu compra #${result.purchase_id} ha sido realizada`, result.user_id!, result.purchase_id!);
            pushNewOrderDelivery("Nueva compra", `Nueva compra realizada por ${result.user_id}`, result.purchase_id!);

            return {
                success: true,
                purchase: result
            };
        }
        return false;
    }
    return false;
};
