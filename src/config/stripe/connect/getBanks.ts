import { stripe } from "../stripe.js";

export const getListBankAccounts = async (account_id: string) => {
    try {
        const bankAccounts = await stripe.accounts.listExternalAccounts(
            account_id,
            { object: 'bank_account' }
        );
        return bankAccounts;
    } catch (error) {
        console.error("Error al obtener las cuentas bancarias:", error);
        throw error;
    }
}