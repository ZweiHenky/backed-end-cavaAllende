import { pool } from "#config/db.js";

export const getAccuntToPayStripe = async () => {
    const query = `
        SELECT
            p.payout_id,
            p.user_id,
            p.total_amount,
            sa.stripe_id
        FROM payouts_deliveries p
        INNER JOIN "stripeAccount" sa
            ON sa.user_id = p.user_id
        WHERE 
            (p.status = 'pending'
            OR p.status = 'failed')
            AND sa.is_active = true
            AND p.total_amount > 0;
    `;
    const { rows } = await pool.query(query);
    return rows;
}