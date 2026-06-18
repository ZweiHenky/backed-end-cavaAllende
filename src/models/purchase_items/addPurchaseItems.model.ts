import { pool } from "#config/db.js";
import { PurchaseItemInsert } from "#domain/interfaces/purchaseItems.interface.js";

export const addPurchaseItemsModel = async (items: PurchaseItemInsert[], tx?: any) => {
    if (!items || items.length === 0) return [];

    const sql = tx || pool;
    const res = await sql.query(`
        INSERT INTO purchase_items (${sql(items as any)})
        RETURNING *
    `);

    return res.rows;
};
