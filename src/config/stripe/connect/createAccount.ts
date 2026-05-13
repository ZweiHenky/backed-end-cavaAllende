import Stripe from "stripe";
import { stripe } from "../stripe.js";

export const createAccount = async (email: string, name: string) : Promise<Stripe.Response<Stripe.V2.Core.Account>> => {
    try {
        const account = await stripe.v2.core.accounts.create({
        contact_email: email,
        display_name: name,
        identity: {
            country: 'MX',
            entity_type: 'individual',
        },
        configuration: {
            recipient: {
                capabilities:{
                    stripe_balance:{
                        stripe_transfers:{
                            requested: true,
                        }
                    }
                }
            },
        },
        defaults: {
            currency: 'mxn',
            locales: ['es'],
            responsibilities: {
                fees_collector: 'application',
                losses_collector: 'application',
            },
            profile:{
                product_description:"Repartidor de Cava Allende",
                business_url:""
            }
        },
        dashboard: "none",
        include: [
            'configuration.recipient',
            'identity',
            'defaults',
        ],
        });

        console.log("cuenta creada", account);

        return account;
    } catch (error) {
        console.error(error);
        throw error;
    }
}