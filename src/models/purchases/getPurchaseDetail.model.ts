import { sql } from "#config/db.js";

export const getPurchaseDetailModel = async (purchaseId: string) => {
    // Get the purchase info
    const purchase = await sql`
        SELECT 
            p.*,
            l.*,
            u.name as user_name,
            u."phoneNumber" as user_phone,
            d.name as delivery_name,
            d."phoneNumber" as delivery_phone
        FROM purchases p
        LEFT JOIN locations l ON p.location_id = l.location_id
        LEFT JOIN "user" u ON p.user_id = u.id
        LEFT JOIN "user" d ON p.delivery_id = d.id
        WHERE p.purchase_id = ${purchaseId}
    `;

    if (!purchase || purchase.length === 0) {
        return null;
    }

    // Get the purchase items along with basic product details
    const items = await sql`
        SELECT 
            pi.*,
            p.name as product_name,
            p.image as product_image,
            p.price as product_price,
            p.category_id,
            p.type_id
        FROM purchase_items pi
        LEFT JOIN products p ON pi.product_id = p.product_id
        WHERE pi.purchase_id = ${purchaseId}
    `;

    return {
        ...purchase[0],
        purchase_items: items
    };
};
