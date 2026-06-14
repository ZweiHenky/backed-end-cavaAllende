import { stripe } from "#config/stripe/stripe.js";
import { getPayoutByStripeId } from "#models/payoutsDeliveries/getPayoutByStripeId.js";
import { updatePayoutStatus } from "#models/payoutsDeliveries/updatePayoutStatus.js";
import { Request, Response } from "express";

const endpointSecret = process.env.STRIPE_CONNECT_WEBHOOK_SECRET;

export const connectWebhook = async (req: Request, res: Response) => {
    try {
        const signature = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature as string,
                endpointSecret as string
            );
        } catch (err: unknown) {
            console.log(`⚠️ Webhook signature verification failed.`, err);
            return res.sendStatus(400);
        }
        switch (event.type) {

            case "payout.paid":
                const payoutPaid = event.data.object;
                console.log("payoutPaid", payoutPaid);

                const payoutBD = await getPayoutByStripeId(payoutPaid.id);
                if (payoutBD) {
                    await updatePayoutStatus(payoutBD.payout_id, "paid", payoutPaid.id);
                }
                break;
            case "payout.failed":
                const payoutFailed = event.data.object;
                console.log("payoutFailed", payoutFailed);

                const payoutFBD = await getPayoutByStripeId(payoutFailed.id);
                if (payoutFBD) {
                    await updatePayoutStatus(payoutFBD.payout_id, "failed", payoutFailed.id);
                }
                break;
            default:
                break;
        }
    } catch (error) {
        console.error("Error en el webhook de stripe para el pago a delivery:", error);
        throw error;
    }
}