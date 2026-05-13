import { stripe } from "#config/stripe/stripe.js";

export const getBalanceTransaction = async (balance_transaction_id: string) => {
    const balance_transaction = await stripe.balanceTransactions.retrieve(balance_transaction_id);
    return balance_transaction;
}