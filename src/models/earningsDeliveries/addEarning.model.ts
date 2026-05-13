import { sql as defaultSql } from "#config/db.js";
import { CreateEarningDto } from "#domain/dtos/earningsDeliveries/createEarning.dto.js";

export const addEarningModel = async (data: CreateEarningDto, tx?: any) => {
    const sql = tx || defaultSql;
    
    const res = await sql`
        INSERT INTO earnings_deliveries (
            user_id, purchase_id, amount, status, type, created_at, available_at
        ) VALUES (
            ${data.user_id}, 
            ${data.purchase_id}, 
            ${data.amount}, 
            ${data.status}, 
            ${data.type},
            NOW(),
            NOW() + interval '2 days'
        )
        RETURNING *
    `;

    console.log(res, "res");

    if (res.length === 0) {
        throw new Error("Earning not created");
    }

    return res[0];
};
