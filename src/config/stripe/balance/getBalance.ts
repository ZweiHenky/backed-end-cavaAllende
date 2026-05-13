import Stripe from "stripe";
import { stripe } from "../stripe.js";


export const getBalanceAccount = async () : Promise<Stripe.Balance> => {
    try {
        const balance : Stripe.Balance = await stripe.balance.retrieve()

        return balance
    } catch (error: any) {
        throw error
    }
}