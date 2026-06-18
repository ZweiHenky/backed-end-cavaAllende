import { pool } from "#config/db.js";

export const getActivePurchaseByDeliveryModel = async (deliveryId: string) => {
    const res = await pool.query(`
        SELECT 
            p.*,
            l.*,
            u.name as user_name,
            u."phoneNumber" as user_phone
        FROM purchases p
        LEFT JOIN locations l ON p.location_id = l.location_id
        LEFT JOIN "user" u ON p.user_id = u.id
        WHERE p.delivery_id = $1
          AND p.status IN ('collecting', 'on_the_way')
        ORDER BY p.created_at DESC
        LIMIT 1
    `, [deliveryId]);

    return res.rows.length > 0 ? res.rows[0] : null;
};
