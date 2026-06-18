import { stripe } from "#config/stripe/stripe.js";

export const getBalanceTransaction = async (balance_transaction_id: string) => {
    try{
    const balance_transaction = await stripe.balanceTransactions.retrieve(balance_transaction_id);
    return balance_transaction;
    }catch(error){
        console.error(error);
        // throw error;
    }
}