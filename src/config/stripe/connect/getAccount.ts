import Stripe from "stripe";
import { stripe } from "../stripe.js";

export const getAccount = async (accountId: string) => {
    try {
        const account = await stripe.v2.core.accounts.retrieve(
            accountId,
            {
                include: ["configuration.recipient", "requirements"]
            }
        );
        return account;
    } catch (error) {
        console.error(error);
        // throw error;
    }
}
