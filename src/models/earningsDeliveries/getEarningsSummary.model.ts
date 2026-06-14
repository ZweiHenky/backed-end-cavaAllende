import { sql } from "#config/db.js";

export const getEarningsSummaryModel = async (user_id: string) => {
    const res = await sql`
        SELECT 
            COALESCE(SUM(CASE WHEN available_at <= NOW() THEN amount ELSE 0 END)::FLOAT, 0) AS available,
            COALESCE(SUM(CASE WHEN available_at > NOW() THEN amount ELSE 0 END)::FLOAT, 0) AS pending
        FROM earnings_deliveries
        WHERE user_id = ${user_id}
        AND payout_id IS NULL
        AND status = 'pending'
    `;

    return res[0];
};
