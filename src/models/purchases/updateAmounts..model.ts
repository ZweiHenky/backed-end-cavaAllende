import { pool, sql } from "#config/db.js";

export const updateAmounts = async (purchase_id: number, fee: number, net: number) => {

    const [result] = await sql`
        UPDATE purchases 
        SET taxes = ${fee}, total = ${net} 
        WHERE purchase_id = ${purchase_id}
    `;
    return result;
}