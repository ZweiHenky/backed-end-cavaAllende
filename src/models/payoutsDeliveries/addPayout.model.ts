import { sql as defaultSql } from "#config/db.js";
import { CreatePayoutDto } from "#domain/dtos/payoutsDeliveries/createPayout.dto.js";

export const addPayoutModel = async (data: CreatePayoutDto, tx?: any) => {
    const sql = tx || defaultSql;
    
    const res = await sql`
        INSERT INTO payouts_deliveries (
            user_id, total_amount, status, payment_method, created_at
        ) VALUES (
            ${data.user_id || null}, 
            ${data.total_amount || 0}, 
            ${data.status || 'PENDING'}, 
            ${data.payment_method || null},
            NOW()
        )
        RETURNING *
    `;

    if (res.length === 0) {
        throw new Error("Payout not created");
    }

    return res[0];
};
