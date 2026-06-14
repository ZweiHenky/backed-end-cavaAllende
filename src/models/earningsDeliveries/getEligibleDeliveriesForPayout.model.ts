import { sql } from "#config/db.js";

interface EligibleDelivery {
    user_id: string;
    available_amount: number;
    stripe_id: string;
}

export const getEligibleDeliveriesForPayout = async (): Promise<EligibleDelivery[]> => {
    try {
        const res = await sql`
            SELECT 
                u.id as user_id,
                COALESCE(SUM(e.amount)::FLOAT, 0) as available_amount,
                s.stripe_id
            FROM "user" u
            JOIN "stripeAccount" s ON u.id = s.user_id
            JOIN earnings_deliveries e ON u.id = e.user_id
            WHERE u.role = 'delivery'
            AND e.status = 'pending'
            AND e.payout_id IS NULL

            GROUP BY u.id, s.stripe_id
            HAVING COALESCE(SUM(e.amount)::FLOAT, 0) > 0
        `;
        return res as unknown as EligibleDelivery[];
    } catch (error) {
        console.error("Error al obtener deliveries elegibles para pago:", error);
        throw error;
    }
};

// AND e.available_at <= NOW()