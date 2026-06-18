import { pool } from "#config/db.js";

export const getUserByPhone = async (phoneNumber: string) => {
    const result = await pool.query(`SELECT * FROM "user" WHERE "phoneNumber" = $1`, [phoneNumber]);
    return result.rows;
}