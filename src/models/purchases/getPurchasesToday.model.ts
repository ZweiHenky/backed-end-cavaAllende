import { sql } from "#config/db.js";

export const getPurchasesTodayModel = async (statuses: string[]) => {

    const res = await sql`
        SELECT * FROM purchases
        WHERE created_at >= CURRENT_DATE
        AND created_at < CURRENT_DATE + INTERVAL '1 day'
        AND status = ANY(${statuses})
        ORDER BY created_at DESC;
    `;
    console.log(res);
    return res;
};
