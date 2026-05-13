import { sql } from "#config/db.js";
import { StripeEntity } from "#domain/entities/stripe.entity.js";
import { IStripe } from "#domain/interfaces/stripe.interface.js";

export const getStripeByUserIdModel = async (userId: string): Promise<StripeEntity | null> => {
    try {
        const result = await sql`
            SELECT * FROM "stripeAccount" WHERE user_id = ${userId}
        `;
        
        if (result.length === 0) {
            return null;
        }

        return StripeEntity.fromJSON(result[0] as IStripe);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
