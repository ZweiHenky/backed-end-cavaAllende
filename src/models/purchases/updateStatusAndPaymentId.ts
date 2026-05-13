import { pool } from "#config/db.js";
import { PurchaseEntity } from "#domain/entities/purchases.entity.js";

export const updateStatusAndPaymentId = async (purchaseId: number, status: string, paymentId: string): Promise<PurchaseEntity | null> => {
    
    const query = `
        UPDATE purchases
        SET status = $1, payment_reference = $2
        WHERE purchase_id = $3
        RETURNING *
    `;
    const result = await pool.query(query, [status, paymentId, purchaseId]);
    
    if (result.rows.length === 0) {
        return null;
    }
    
    return result.rows[0];

};