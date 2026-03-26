import { sql as defaultSql } from "#config/db.js";
import { PurchaseInsert } from "#domain/interfaces/purchases.interface.js";

export const addPurchaseModel = async (data: PurchaseInsert, tx?: any) => {
    const sql = tx || defaultSql;
    
    const res = await sql`
        INSERT INTO purchases (
            user_id, subtotal, discount, taxes, shipping_cost, 
            total, payment_method, payment_reference, shipping_address, notes
        ) VALUES (
            ${data.user_id || null}, 
            ${data.subtotal}, 
            ${data.discount || 0}, 
            ${data.taxes || 0}, 
            ${data.shipping_cost || 0}, 
            ${data.total}, 
            ${data.payment_method}, 
            ${data.payment_reference || null}, 
            ${data.shipping_address || null}, 
            ${data.notes || null}
        )
        RETURNING *
    `;

    if (res.length === 0) {
        throw new Error("Purchase not created");
    }

    return res[0];
};
