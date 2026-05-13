import { pool } from "#config/db.js";
import { PurchaseEntity } from "#domain/entities/purchases.entity.js";

export const getPurchaseById = async (purchaseId: number): Promise<PurchaseEntity | null> => {
    
    const query = `
        SELECT * FROM purchases WHERE purchase_id = $1
    `;
    const result = await pool.query(query, [purchaseId]);
    
    if (result.rows.length === 0) {
        return null;
    }
    
    return result.rows[0];

};