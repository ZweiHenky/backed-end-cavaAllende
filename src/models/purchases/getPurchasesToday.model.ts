import { sql } from "#config/db.js";

export const getPurchasesTodayModel = async () => {
    const res = await sql`
        SELECT * FROM purchases
        WHERE DATE(created_at) = CURRENT_DATE
        AND (status = 'paid' OR status = 'on_the_way')
        ORDER BY created_at DESC
    `;
    return res;
};
