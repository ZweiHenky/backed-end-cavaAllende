import cron from 'node-cron';
import { getAccuntToPayStripe } from '#models/payoutsDeliveries/getAccuntToPayStripe.js';
import { updatePayoutStatus } from '#models/payoutsDeliveries/updatePayoutStatus.js';
import { createPayoutStripeConnect } from '#config/stripe/connect/payout.js';

const runPayoutCycle = async () => {
    try {
        console.log("Iniciando ciclo de pago de stripe para el pago a delivery");
        const users = await getAccuntToPayStripe();

        if (!users) {
            console.log("No hay usuarios para pagar");
            return;
        }
        console.log("Usuarios encontrados", users);
        users.forEach(async (user) => {
            console.log("Pagando a usuario", user.stripe_id);
            const payout = await createPayoutStripeConnect(user.stripe_id, user.total_amount);
            if (payout) {
                console.log("Pago creado", payout);
                await updatePayoutStatus(user.payout_id, "proccess", payout.id);
            }
        });

        console.log("Ciclo de pago de stripe para el pago a delivery completado");
    } catch (error) {
        console.error("Error en el ciclo de pago de stripe para el pago a delivery:", error);
        throw error;
    }
}

export const payoutStripeToDelivery = async () => {
    try {
        runPayoutCycle();
        cron.schedule('0 2 * * *', runPayoutCycle, {
            timezone: 'America/Mexico_City'
        });
    } catch (error) {
        console.error("Error en el cron de stripe para el pago a delivery:", error);
        // throw error;
    }

}