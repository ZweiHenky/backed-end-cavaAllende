import { pool } from "#config/db.js";

export const getDeliveryIdByPurchaseModel = async (purchase_id: number) => {
    const res = await pool.query(`SELECT delivery_id FROM purchases WHERE purchase_id = $1`, [purchase_id]);
    return res.rows[0];
};