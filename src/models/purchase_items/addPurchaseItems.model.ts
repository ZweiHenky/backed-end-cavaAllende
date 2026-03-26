import { sql as defaultSql } from "#config/db.js";
import { PurchaseItemInsert } from "#domain/interfaces/purchaseItems.interface.js";

export const addPurchaseItemsModel = async (items: PurchaseItemInsert[], tx?: any) => {
    if (!items || items.length === 0) return [];
    
    // Using sql() for bulk insert
    const sql = tx || defaultSql;
    const res = await sql`
        INSERT INTO purchase_items ${sql(items as any)}
        RETURNING *
    `;
    
    return res;
};
