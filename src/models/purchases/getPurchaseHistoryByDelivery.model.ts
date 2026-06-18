import { pool } from "#config/db.js";

export const getPurchaseHistoryByDeliveryModel = async (deliveryId: string) => {
    const res = await pool.query(`
        SELECT *
        FROM purchases
        WHERE delivery_id = $1
          AND status IN ('completed', 'cancelled')
        ORDER BY created_at DESC
    `, [deliveryId]);

    return res.rows; 
};
