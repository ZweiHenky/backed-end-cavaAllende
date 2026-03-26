import { sql as defaultSql } from "#config/db.js";
import { ReduceStockItem } from "#domain/interfaces/product.interface.js";

export const reduceProductStockModel = async (items: ReduceStockItem[], tx?: any) => {
    const updatedProducts = [];
    
    const sql = tx || defaultSql;
    for (const item of items) {
        if (!item.product || !item.product.product_id) continue;
        
        const res = await sql`
            UPDATE products
            SET stock = stock - ${item.quantity}
            WHERE product_id = ${item.product.product_id}
            RETURNING *
        `;
        
        if (res.length > 0) {
            updatedProducts.push(res[0]);
        }
    }
    
    return updatedProducts;
};
