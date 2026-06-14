import { pool } from "#config/db.js";

export const getPayoutByStripeId = async (payoutId: string) => {
    const query = `
        SELECT * FROM payouts_deliveries WHERE stripe_payout_id = $1;
    `;
    const { rows } = await pool.query(query, [payoutId]);
    return rows[0];
}