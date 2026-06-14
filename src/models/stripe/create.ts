import { sql } from "#config/db.js";
import { StripeEntity } from "#domain/entities/stripe.entity.js";
import { IStripe } from "#domain/interfaces/stripe.interface.js";

export const createStripe = async (stripe: IStripe) : Promise<StripeEntity> => {
    try {
        const result = await sql`
            INSERT INTO "stripeAccount" (user_id, is_active, stripe_id) VALUES (${stripe.user_id}, ${stripe.is_active}, ${stripe.stripe_id}) RETURNING *`;
        return StripeEntity.fromJSON(result[0] as IStripe);
    } catch (error) {
        console.error(error);
        throw error;
    }
}