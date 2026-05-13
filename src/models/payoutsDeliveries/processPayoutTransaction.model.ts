import { pool } from "#config/db.js";
import { CreatePayoutDto } from "#domain/dtos/payoutsDeliveries/createPayout.dto.js";

export const processPayoutTransaction = async (data: CreatePayoutDto) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Insert Payout
        const payoutQuery = `
            INSERT INTO payouts_deliveries (
                user_id, total_amount, status, payment_method, created_at
            ) VALUES (
                $1, $2, $3, $4, NOW()
            )
            RETURNING *
        `;
        const payoutValues = [
            data.user_id || null,
            data.total_amount || 0,
            data.status || 'PENDING',
            data.payment_method || null
        ];

        const payoutRes = await client.query(payoutQuery, payoutValues);
        const payout = payoutRes.rows[0];

        if (!payout) {
            throw new Error("Failed to create payout");
        }

        // 2. Update earnings_deliveries reference_id
        if (data.user_id) {
            const updateEarningsQuery = `
                UPDATE earnings_deliveries
                SET reference_id = $1,
                    status = 'PAID'
                WHERE user_id = $2 
               
                AND reference_id IS NULL
                AND available_at <= NOW()
            `;
            await client.query(updateEarningsQuery, [payout.payout_id.toString(), data.user_id]);
        }

        await client.query('COMMIT');
        return payout;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Payout transaction failed, rolled back:", error);
        throw error;
    } finally {
        client.release();
    }
};
