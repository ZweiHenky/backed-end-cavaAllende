import { stripe } from "#config/stripe/stripe.js";

export const getCharge = async (charge_id: string) => {
    const charge = await stripe.charges.retrieve(charge_id);
    return charge;
}