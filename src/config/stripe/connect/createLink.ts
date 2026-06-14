import Stripe from "stripe";
import { stripe } from "../stripe.js";

const BASE_URL = process.env.BETTER_AUTH_URL;

export const createLink = async (accountId: string) : Promise<Stripe.Response<Stripe.AccountLink>> => {
    try {
        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            type: 'account_onboarding',
            return_url: `${BASE_URL}/v0/api/stripe/connect/return`,
            refresh_url: `${BASE_URL}/v0/api/stripe/connect/retry`,
        });

        return accountLink;
    } catch (error) {
        console.error(error);
        throw error;
    }
}