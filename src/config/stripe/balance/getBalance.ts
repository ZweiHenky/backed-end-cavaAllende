import Stripe from "stripe";
import { stripe } from "../stripe.js";


export const getBalanceAccount = async (account_id?: string): Promise<Stripe.Balance> => {
    try {

        if (account_id) {
            const balance: Stripe.Balance = await stripe.balance.retrieve({
                stripeAccount: account_id
            })
            return balance
        } else {
            const balance: Stripe.Balance = await stripe.balance.retrieve()
            return balance
        }
    } catch (error: any) {
        console.error(`Error al obtener el balance: ${error}`)
        throw error
    }
}