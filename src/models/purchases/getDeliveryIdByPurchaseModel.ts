import { sql } from "#config/db.js";

export const getDeliveryIdByPurchaseModel = async (purchase_id: number) => {
    const purchase = await sql`SELECT delivery_id FROM purchases WHERE purchase_id = ${purchase_id}`;
    return purchase;
};