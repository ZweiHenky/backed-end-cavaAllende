import { getBalanceAccount } from "#config/stripe/balance/getBalance.js";

export const getBalanceService = async (accountId?: string) => {
    const balance = await getBalanceAccount(accountId);
    
    if (!balance) {
        throw new Error("No se pudo obtener el balance de Stripe");
    }
    
    return balance;
};
