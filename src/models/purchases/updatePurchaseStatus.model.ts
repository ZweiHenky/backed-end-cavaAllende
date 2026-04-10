import { sql } from "#config/db.js";
import { PurchaseEntity } from "#domain/entities/purchases.entity.js";

export const updatePurchaseStatusModel = async (status: string, id: number): Promise<PurchaseEntity> => {
    const res = await sql`
        UPDATE purchases
        SET status = ${status}
        WHERE purchase_id = ${id}
        RETURNING *
    `;
    return res[0] as PurchaseEntity;
};
