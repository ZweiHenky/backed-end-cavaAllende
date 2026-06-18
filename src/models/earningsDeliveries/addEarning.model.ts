import { pool } from "#config/db.js";
import { CreateEarningDto } from "#domain/dtos/earningsDeliveries/createEarning.dto.js";

export const addEarningModel = async (data: CreateEarningDto, tx?: any) => {
    const query = tx || pool;

    const res = await query.query(`
        INSERT INTO earnings_deliveries (
            user_id, purchase_id, amount, status, type, created_at, available_at
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            NOW(),
            NOW() + interval '2 days'
        )
        RETURNING *
    `,[
        data.user_id,
        data.purchase_id,
        data.amount,
        data.status,
        data.type
    ]);

    if (res.rows.length === 0) {
        throw new Error("Earning not created");
    }

    return res.rows[0];
};
