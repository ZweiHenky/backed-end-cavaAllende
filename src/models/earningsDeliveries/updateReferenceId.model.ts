import { sql } from "#config/db.js";

export const updateReferenceIdModel = async (user_id: string, reference_id: string, tx?: any) => {
    const db = tx || sql;

    const res = await db`
        UPDATE earnings_deliveries
        SET reference_id = ${reference_id}
        WHERE user_id = ${user_id} 
          AND available_at <= NOW() 
          AND reference_id IS NULL
        RETURNING *
    `;

    return res;
};
