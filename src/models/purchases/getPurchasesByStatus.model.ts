import { sql } from "#config/db.js";

export const getPurchasesByStatusModel = async (statuses: string[], user_id?: string | number) => {
    const res = await sql`
        SELECT * FROM purchases
        WHERE status = ANY(${statuses})
        ${user_id ? sql`AND user_id = ${user_id}` : sql``}
        ORDER BY created_at DESC
    `;
    return res;
};
