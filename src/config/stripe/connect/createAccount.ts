import Stripe from "stripe";
import { stripe } from "../stripe.js";

export const createAccount = async (email: string, name: string) : Promise<Stripe.Response<Stripe.Account>> => {
    try {

        const account = await stripe.accounts.create({
            country: 'MX',
            business_type: "individual",
            email: email,
            controller: {
                fees: {
                payer: 'application',
                },
                losses: {
                payments: 'application',
                },
                stripe_dashboard: {
                type: 'express',
                },
            },
            settings:{
                payouts: {
                    schedule: {
                        interval: "manual",
                    }
                }
            },
            business_profile: {
                url: "Repartidor de Cava Allende",
                name: name,
            },
            default_currency: "mxn"
        });

        console.log("cuenta creada", account);

        return account;
    } catch (error) {
        console.error(error);
        throw error;
    }
}