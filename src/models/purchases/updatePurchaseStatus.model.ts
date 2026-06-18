import { pool } from "#config/db.js";
import { PurchaseEntity } from "#domain/entities/purchases.entity.js";

export const updatePurchaseStatusModel = async (status: string, id: number): Promise<PurchaseEntity> => {
    const res = await pool.query(`
        UPDATE purchases
        SET status = $1
        WHERE purchase_id = $2
        RETURNING *
    `, [status, id]);
    return res.rows[0];
};
