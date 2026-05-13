import Stripe from "stripe";
import { stripe } from "../stripe.js";


export const tranferToAccountDelivery = async (amount: number, destination: string, currency: string) => {

    try {
        const res = await stripe.transfers.create({
            amount: amount,
            destination: destination,
            currency: currency,
        })

        if (!res) {
            throw new Error("Error al transferir el dinero")
        }

        return res
        
    } catch (error: any) {
        throw error;
    }
}
    