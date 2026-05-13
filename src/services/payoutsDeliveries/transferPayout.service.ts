import { tranferToAccountDelivery } from "#config/stripe/connect/tranfer.js";
import { getStripeByUserIdModel } from "#models/users/getStripeByUserId.model.js";
import { getEarningsSummaryModel } from "#models/earningsDeliveries/getEarningsSummary.model.js";
import { processPayoutTransaction } from "#models/payoutsDeliveries/processPayoutTransaction.model.js";
import { getBalanceAccount } from "#config/stripe/balance/getBalance.js";

export const transferPayoutService = async (user_id: string, amount: number) => {
    // 0. Validate available amount
    const summary = await getEarningsSummaryModel(user_id);
    if (summary.available < amount) {
        throw new Error(`El monto a transferir (${amount}) supera el monto disponible (${summary.available})`);
    }

    if (amount <= 0) {
        throw new Error("El monto a transferir debe ser mayor a 0");
    }

    const balance = await getBalanceAccount()

    if(balance.available[0].amount < amount * 100) {
        throw new Error("No tienes suficiente saldo para realizar esta transferencia");
    }


    // 1. Get user's stripe account
    const stripeAccount = await getStripeByUserIdModel(user_id);
    
    if (!stripeAccount || !stripeAccount.stripe_id) {
        throw new Error("El usuario no tiene una cuenta de Stripe conectada");
    }

    // 2. Transfer money to the connected account
    const transfer = await tranferToAccountDelivery(amount * 100, stripeAccount.stripe_id, "mxn");

    // 3. Process payout transaction (inserts payout and updates earnings reference_id)
    const payout = await processPayoutTransaction({
        user_id,
        total_amount: amount,
        status: "COMPLETED",
        payment_method: "stripe"
    });

    return {
        transfer,
        payout
    };
};
