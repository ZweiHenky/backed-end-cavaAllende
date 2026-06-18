import { pool } from "#config/db.js";

export const getAllTypesModel = async () => {
    const res = await pool.query(`SELECT * FROM types`);
    return res.rows;
}
