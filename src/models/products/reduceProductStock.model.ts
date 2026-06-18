import { pool } from "#config/db.js";

export const reduceProductStockModel = async (items: any[], tx?: any) => {
    const updatedProducts = [];

    const sql = tx || pool;
    for (const item of items) {
        if (!item.product || !item.product.product_id) continue;

        const res = await sql.query(`
            UPDATE products
            SET stock = stock - $1
            WHERE product_id = $2
            RETURNING *
        `, [item.quantity, item.product.product_id]);

        if (res.rows.length > 0) {
            updatedProducts.push(res.rows[0]);
        }
    }

    return updatedProducts;
};
