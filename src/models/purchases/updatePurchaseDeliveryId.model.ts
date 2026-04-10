import { sql } from "#config/db.js";

export const updatePurchaseDeliveryIdModel = async (delivery_id: string, id: number, status: string) => {
    
    const res = await sql`
        UPDATE purchases
        SET delivery_id = ${delivery_id}, status = ${status}
        WHERE purchase_id = ${id}
        RETURNING *;
    `;
    return res[0];
};