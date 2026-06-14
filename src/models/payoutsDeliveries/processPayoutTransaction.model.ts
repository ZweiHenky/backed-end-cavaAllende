import { pool } from "#config/db.js";
import { CreatePayoutDto } from "#domain/dtos/payoutsDeliveries/createPayout.dto.js";

export const processPayoutTransaction = async (data: CreatePayoutDto, transfer_id: string) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Insert Payout
        const payoutQuery = `
            INSERT INTO payouts_deliveries (
                user_id, total_amount, status, payment_method, created_at, transfer_id
            ) VALUES (
                $1, $2, $3, $4, NOW(), $5
            )
            RETURNING *
        `;
        const payoutValues = [
            data.user_id!,
            data.total_amount,
            data.status,
            data.payment_method,
            transfer_id
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
                SET payout_id = $1,
                    status = 'paid'
                WHERE user_id = $2 and payout_id IS NULL
            `;
            await client.query(updateEarningsQuery, [payout.payout_id, data.user_id]);
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
