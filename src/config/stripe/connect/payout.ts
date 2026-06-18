import { getBalanceAccount } from "../balance/getBalance.js";
import { stripe } from "../stripe.js";
import { getAccount } from "./getAccount.js";

export const createPayoutStripeConnect = async (account_id?: string, amount?: number) => {
    try {

        const getBalance = await getBalanceAccount(account_id);

        if (getBalance?.available[0].amount === 0) {
            console.log(`[${account_id}] No hay saldo disponible para pagar`);
            return;
        }

        if (!amount) {
            throw new Error("No se especifico un monto para pagar");
        }

        if (!account_id) {
            throw new Error("No se especifico una cuenta para pagar");
        }

        const accountExist = await getAccount(account_id);

        if (!accountExist) {
            throw new Error("Error al obtener la cuenta");
        }

        if (!accountExist.id) {
            throw new Error("La cuenta no existe");
        }

        // const externalAccounts = await stripe.accounts.listExternalAccounts(
        //     account_id,
        //     { object: 'bank_account' }
        // );
        // if (externalAccounts.data.length === 0) {
        //     throw new Error("No se encontro una cuenta bancaria");
        // }

        const payout = await stripe.payouts.create({
            amount: amount * 100,
            currency: "mxn",
        }, {
            stripeAccount: account_id
        });

        return payout;
    } catch (error) {
        console.error("Error al crear el pago de stripe para el pago a delivery:", error);
        // throw error;
    }
}