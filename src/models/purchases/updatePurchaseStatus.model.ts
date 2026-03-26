import { sql } from "#config/db.js";

export const updatePurchaseStatusModel = async (purchase_id: string | number, status: string) => {
    const res = await sql`
        UPDATE purchases
        SET status = ${status}, updated_at = CURRENT_TIMESTAMP
        WHERE purchase_id = ${purchase_id}
        RETURNING *
    `;
    return res[0];
};
