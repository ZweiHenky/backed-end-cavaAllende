import { stripe } from "#config/stripe/stripe.js";

export const getCharge = async (charge_id: string) => {
    try{
    const charge = await stripe.charges.retrieve(charge_id);
    return charge;
    }catch(error){
        console.error(error);
        // throw error;
    }
}