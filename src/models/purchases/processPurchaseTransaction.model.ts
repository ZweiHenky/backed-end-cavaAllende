import { pool } from "#config/db.js";
import { LocationEntity } from "#domain/entities/location.entity.js";
import { PurchaseInsert } from "#domain/interfaces/purchases.interface.js";

export const processPurchaseTransaction = async (
    purchaseData: PurchaseInsert, 
    orderItems: any[],
    location: LocationEntity
) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        // 1. Insert Purchase
        // We use client.query explicitly to avoid the tagged template pseudo-wrapper issue
        // 1. Insert Purchase
        if (!purchaseData.user_id) {
            throw new Error("user_id is required to create a purchase");
        }
        
        // We use client.query explicitly to avoid the tagged template pseudo-wrapper issue
        // We MUST specify the columns to ensure Postgres doesn't try to insert our array into `purchase_id` sequentially.
        const purchaseQuery = `
            INSERT INTO purchases (
                user_id, 
                subtotal, 
                discount, 
                taxes, 
                shipping_cost, 
                total, 
                payment_method, 
                payment_reference, 
                shipping_address, 
                status,
                notes,
                location_id
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
            )
            RETURNING *
        `;
        const purchaseValues = [
            purchaseData.user_id, 
            purchaseData.subtotal, 
            purchaseData.discount || 0, 
            purchaseData.taxes || 0, 
            purchaseData.shipping_cost || 0, 
            purchaseData.total, 
            purchaseData.payment_method, 
            purchaseData.payment_reference || null, 
            purchaseData.shipping_address || null, 
            "paid",
            purchaseData.notes || null,
            location.location_id
        ];
        
        const purchaseRes = await client.query(purchaseQuery, purchaseValues);
        const purchase = purchaseRes.rows[0];
        
        if (!purchase) {
            throw new Error("Failed to create purchase");
        }

        // 2. Insert Purchase Items & Reduce Stock
        if (orderItems && orderItems.length > 0) {
            
            // Build bulk insert query
            const itemValues = [];
            const valueStrings = [];
            let i = 1;
            
            for (const item of orderItems) {
                valueStrings.push(`($${i++}, $${i++}, $${i++}, $${i++}, $${i++})`);
                itemValues.push(
                    purchase.purchase_id,
                    item.product.product_id,
                    item.quantity,
                    item.product.price || 0,
                    (item.product.price || 0) * item.quantity
                );
            }
            
            const insertItemsQuery = `
                INSERT INTO purchase_items (
                    purchase_id, product_id, quantity, unit_price, line_total
                ) VALUES ${valueStrings.join(', ')}
            `;
            
            await client.query(insertItemsQuery, itemValues);
            
            // 3. Reduce Stock
            for (const item of orderItems) {
                const reduceStockQuery = `
                    UPDATE products
                    SET stock = stock - $1
                    WHERE product_id = $2
                    RETURNING *
                `;
                await client.query(reduceStockQuery, [item.quantity, item.product.product_id]);
            }
        }
        
        await client.query('COMMIT');
        return purchase;
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Transaction failed, rolled back:", error);
        throw error;
    } finally {
        client.release();
    }
};
