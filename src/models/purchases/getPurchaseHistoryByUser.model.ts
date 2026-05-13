import { sql } from "#config/db.js";

export const getPurchaseHistoryByUserModel = async (userId: string) => {
    const res = await sql`
        SELECT *
        FROM purchases
        WHERE user_id = ${userId}
          AND status IN ('completed', 'cancelled')
        ORDER BY created_at DESC
    `;

    return res;
};
