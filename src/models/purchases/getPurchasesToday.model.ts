import { pool } from "#config/db.js";

export const getPurchasesTodayModel = async (statuses: string[]) => {

    const res = await pool.query(`
        SELECT * FROM purchases
        WHERE status = ANY($1::purchase_status[])
        ORDER BY created_at DESC;
    `, [statuses]);

    return res.rows;
};
