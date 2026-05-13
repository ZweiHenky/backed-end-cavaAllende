import { stripe } from "#config/stripe/stripe.js";
import { Request, Response } from "express";
import { processSuccessfulPaymentService } from "#services/webhooks/processSuccessfulPayment.service.js";
import { getIo } from "#socket/initSocket.js";
import { sendCreatePurchase } from "#socket/events/purchases/sendCreatePurchase.js";
import { addPurchase, deletePurchase, isValidPurchase } from "#utils/purchases/purchasesInProccess.js";
import { addCharge, chargesInProcess, deleteCharge, isValidCharge } from "#utils/purchases/chargeInProcess.js";
import { getBalanceTransaction } from "#config/stripe/balance_transaction/getBalanceTransaction.js";
import { updateAmounts } from "#models/purchases/updateAmounts..model.js";
import { getCharge } from "#config/stripe/charge/getCharge.js";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const stripeWebhook = async (req: Request, res: Response) => {

    const io = getIo();

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
        console.log(event.type);
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                try {
                    if (isValidPurchase(paymentIntent.id)) {
                        return;
                    }

                    if(!paymentIntent.latest_charge){
                        throw new Error("Charge not found");
                    }
                    
                    const processed = await processSuccessfulPaymentService(paymentIntent);
                    if (processed) {
                        sendCreatePurchase(io, paymentIntent.id);
                    }
                } catch (error) {
                    console.error("Error processing successful payment:", error);
                }

                
                console.log(`✅ Payment intent succeeded.`, paymentIntent.id);
            break;
            case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
            case 'charge.updated':
            const charge = event.data.object;

            const {payment_intent} = charge;

            if(!payment_intent){
                throw new Error("Payment intent not found");
            }
            
            if(isValidPurchase(payment_intent as string)){
                return;
            }

            if(charge.status === "succeeded"){
                try {

                    console.log("charge.balance_transaction", charge.balance_transaction);

                    const balanceTransaction = await getBalanceTransaction(charge.balance_transaction as string);

                    console.log("balanceTransaction", balanceTransaction);
                
                    const {fee, net} = balanceTransaction

                    console.log("fee", fee);
                    console.log("net", net);

                    await updateAmounts(Number(charge.metadata?.order_id), Number((fee / 100).toFixed(2)), Number((net / 100).toFixed(2)));

                    deleteCharge(charge.id);
                    deletePurchase(charge.metadata?.order_id as string);
                    
                } catch (error) {
                    console.error("Error processing charge updated:", error);
                }
                
            }

            break;
            // ... handle other event types
            default:
            console.log(`Unhandled event type ${event.type}`);
        }

        // Return a response to acknowledge receipt of the event
        res.json({received: true});  
    };
};
