import Stripe from "stripe";
import { stripe } from "../stripe.js";


export const tranferToAccountDelivery = async (amount: number, destination: string, currency: string, user_id: string) => {

    try {
        const res = await stripe.transfers.create({
            amount: amount,
            destination: destination,
            currency: currency,
            metadata: {
                user_id: user_id
            }
        })

        return res;
    } catch (error: any) {
        console.log("Error al transferir el dinero", error)
        throw error;
    }
}
