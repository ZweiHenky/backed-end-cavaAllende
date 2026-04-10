import { sql } from "#config/db.js";

export const getPurchasesTodayModel = async (statuses: string[]) => {

    const res = await sql`
        SELECT * FROM purchases
        WHERE status = ANY(${statuses}::purchase_status[])
        ORDER BY created_at DESC;
    `;

    return res;
};
