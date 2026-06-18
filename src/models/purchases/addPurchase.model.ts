import { pool } from "#config/db.js";
import { PurchaseInsert } from "#domain/interfaces/purchases.interface.js";

export const addPurchaseModel = async (data: PurchaseInsert, tx?: any) => {
    const query = tx || pool;

    const res = await query.query(`
        INSERT INTO purchases (
            user_id, subtotal, discount, taxes, shipping_cost, 
            total, payment_method, payment_reference, shipping_address, notes, secure_code
        ) VALUES (
            $1, $2, $3, $4, $5, 
            $6, $7, $8, $9, $10, $11
        )
        RETURNING *
    `, [
        data.user_id ?? null,
        data.subtotal,
        data.discount ?? 0,
        data.taxes ?? 0,
        data.shipping_cost ?? 0,
        data.total,
        data.payment_method,
        data.payment_reference ?? null,
        data.shipping_address ?? null,
        data.notes ?? null,
        data.secure_code ?? null
    ]);

    if (res.rows.length === 0) {
        throw new Error("Purchase not created");
    }

    return res.rows[0];
};
