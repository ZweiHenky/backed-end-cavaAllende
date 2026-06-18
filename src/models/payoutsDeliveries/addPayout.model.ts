import { pool } from "#config/db.js";
import { CreatePayoutDto } from "#domain/dtos/payoutsDeliveries/createPayout.dto.js";

export const addPayoutModel = async (data: CreatePayoutDto, tx?: any) => {
    const query = tx || pool;

    const res = await query.query(`
        INSERT INTO payouts_deliveries (
            user_id, total_amount, status, payment_method, created_at
        ) VALUES (
            $1, 
            $2, 
            $3, 
            $4,
            NOW()
        )
        RETURNING *
    `, [
        data.user_id,
        data.total_amount,
        data.status,
        data.payment_method
    ]);

    if (res.rows.length === 0) {
        throw new Error("Payout not created");
    }

    return res.rows[0];
};
