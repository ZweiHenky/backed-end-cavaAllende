import cron from 'node-cron';
import { getEligibleDeliveriesForPayout } from '#models/earningsDeliveries/getEligibleDeliveriesForPayout.model.js';
import { transferPayoutService } from '#services/payoutsDeliveries/transferPayout.service.js';

const runPayoutCycle = async () => {
    console.log('[Cron: payToStripeConnect] Iniciando proceso automático de pagos a repartidores...');
    try {
        const eligibleDeliveries = await getEligibleDeliveriesForPayout();
        console.log(`[Cron: payToStripeConnect] Se encontraron ${eligibleDeliveries.length} repartidores elegibles para pago.`);

        for (const delivery of eligibleDeliveries) {
            try {
                console.log(`[Cron: payToStripeConnect] Procesando pago para usuario ${delivery.user_id} por monto de ${delivery.available_amount}`);
                const result = await transferPayoutService(delivery.user_id, delivery.available_amount);
                console.log(`[Cron: payToStripeConnect] Pago exitoso para usuario ${delivery.user_id}:`, result.payout);
            } catch (error) {
                console.error(`[Cron: payToStripeConnect] Error procesando pago para usuario ${delivery.user_id}:`, error);
            }
        }
    } catch (error) {
        console.error('[Cron: payToStripeConnect] Error general en el cron job:', error);
    }
};

export const payToStripeConnect = async () => {
    // Ejecutar una vez al arrancar para validación/recuperación
    runPayoutCycle();

    // Programar para ejecutarse cada 5 minutos
    cron.schedule('*/5 * * * *', runPayoutCycle);
};