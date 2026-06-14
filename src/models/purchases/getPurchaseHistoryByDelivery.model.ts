import { sql } from "#config/db.js";

export const getPurchaseHistoryByDeliveryModel = async (deliveryId: string) => {
    const res = await sql`
        SELECT *
        FROM purchases
        WHERE delivery_id = ${deliveryId}
          AND status IN ('completed', 'cancelled')
        ORDER BY created_at DESC
    `;

    return res;
};
