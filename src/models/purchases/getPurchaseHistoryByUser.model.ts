import { pool } from "#config/db.js";

export const getPurchaseHistoryByUserModel = async (userId: string) => {
    const res = await pool.query(`
        SELECT *
        FROM purchases
        WHERE user_id = $1
          AND status IN ('completed', 'cancelled')
        ORDER BY created_at DESC
    `, [userId]);

    return res.rows;
};
