import { pool } from "#config/db.js";

export const getPurchasesByStatusModel = async (statuses: string[], user_id?: string | number) => {
    const res = await pool.query(`
        SELECT * FROM purchases
        WHERE status = ANY($1)
        ${user_id ? `AND user_id = $2` : ``}
        ORDER BY created_at DESC
    `, user_id ? [statuses, user_id] : [statuses]);
    return res.rows;
};
