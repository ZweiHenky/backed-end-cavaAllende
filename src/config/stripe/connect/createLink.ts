import Stripe from "stripe";
import { stripe } from "../stripe.js";

const BASE_URL = process.env.BETTER_AUTH_URL;

export const createLink = async (accountId: string) : Promise<Stripe.Response<Stripe.V2.Core.AccountLink>> => {
    try {
        const accountLink = await stripe.v2.core.accountLinks.create({
        account: accountId,
        use_case: {
            type: 'account_onboarding',
            account_onboarding: {
            configurations: ['recipient'],
            return_url: `${BASE_URL}/v0/api/stripe/connect/return`,
            refresh_url: `${BASE_URL}/v0/api/stripe/connect/retry`,
            },
        },
        });

        return accountLink;
    } catch (error) {
        console.error(error);
        throw error;
    }
}