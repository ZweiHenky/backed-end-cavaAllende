import { pool } from "#config/db.js";

export const updatePayoutStatus = async (payoutId: number, status: string, payoutStripeId: string) => {
    const query = `
        UPDATE payouts_deliveries
        SET status = $1,
            stripe_payout_id = $2
        WHERE payout_id = $3;
    `;
    await pool.query(query, [status, payoutStripeId, payoutId]);
}
