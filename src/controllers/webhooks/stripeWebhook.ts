import { stripe } from "#config/stripe.js";
import { Request, Response } from "express";

const endpointSecret = "whsec_PmpmfExUs3M4StRlYFs8rqL3wP9jrxwg";

export const stripeWebhook = async (req: Request, res: Response) => {
   let event;
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = req.headers['stripe-signature'];
        try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature as string,
            endpointSecret
        );
        } catch (err : unknown) {
        console.log(`⚠️ Webhook signature verification failed.`, err);
        return res.sendStatus(400);
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            console.log(`✅ Payment intent succeeded.`, paymentIntent);
            break;
            case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
            // ... handle other event types
            default:
            console.log(`Unhandled event type ${event.type}`);
        }

        // Return a response to acknowledge receipt of the event
        res.json({received: true});  
    };
}
