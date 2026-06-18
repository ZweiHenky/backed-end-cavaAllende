import { pool } from "#config/db.js";
import { StripeEntity } from "#domain/entities/stripe.entity.js";
import { IStripe } from "#domain/interfaces/stripe.interface.js";

export const getStripeByUserIdModel = async (userId: string): Promise<StripeEntity | null> => {
    try {
        const result = await pool.query(`
            SELECT * FROM "stripeAccount" WHERE user_id = $1
        `, [userId]);
        
        if (result.rows.length === 0) {
            return null;
        }

        return StripeEntity.fromJSON(result.rows[0] as IStripe);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
