import { pool } from "#config/db.js";

export const updatePurchaseDeliveryIdModel = async (delivery_id: string, id: number, status: string) => {

    const res = await pool.query(`
        UPDATE purchases
        SET delivery_id = $1, status = $2
        WHERE purchase_id = $3
        RETURNING *;
    `, [delivery_id, status, id]);

    return res.rows[0];
};