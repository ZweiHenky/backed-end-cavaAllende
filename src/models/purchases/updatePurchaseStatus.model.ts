import { sql } from "#config/db.js";

export const updatePurchaseStatusModel = async (status: string, id: number) => {
    const res = await sql`
        UPDATE purchases
        SET status = ${status}
        WHERE purchase_id = ${id}
        RETURNING *
    `;
    return res[0];
};
