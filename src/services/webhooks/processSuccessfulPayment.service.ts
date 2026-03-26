import { processPurchaseTransaction } from "#models/purchases/processPurchaseTransaction.model.js";

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
        
        await processPurchaseTransaction(purchaseData, order, location);
        return true;
    }
    return false;
};
