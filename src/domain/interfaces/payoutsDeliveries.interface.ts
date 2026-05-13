export interface PayoutsDeliveriesInterface {
    payout_id?: number;
    user_id?: string | null;
    total_amount?: number | null;
    status?: string | null;
    payment_method?: string | null;
    created_at?: Date | string | null;
}
