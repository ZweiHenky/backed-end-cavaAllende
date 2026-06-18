import { pool } from "#config/db.js";

export const updateAmounts = async (purchase_id: number, fee: number, net: number) => {

    const result = await pool.query(`
        UPDATE purchases 
        SET taxes = $1, total = $2 
        WHERE purchase_id = $3
        RETURNING *;
    `, [fee, net, purchase_id]);

    return result.rows[0];
}