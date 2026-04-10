import { stripe } from "../stripe.js";

export const createRefiynd = async (paymentIntentId: string) => {
    try {
        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId
        });

        if (refund.status !== "succeeded") {
            throw new Error("Refund not created");
        }

        return refund;
    } catch (error) {
        console.error(error);
        throw error;
    }
}