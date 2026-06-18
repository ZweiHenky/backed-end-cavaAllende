import { pool } from "#config/db.js";

export const getEarningsSummaryModel = async (user_id: string) => {
    const res = await pool.query(`
        SELECT 
            COALESCE(SUM(CASE WHEN available_at <= NOW() THEN amount ELSE 0 END)::FLOAT, 0) AS available,
            COALESCE(SUM(CASE WHEN available_at > NOW() THEN amount ELSE 0 END)::FLOAT, 0) AS pending
        FROM earnings_deliveries
        WHERE user_id = $1
        AND payout_id IS NULL
        AND status = 'pending'
    `, [user_id]);

    return res.rows[0];
};
