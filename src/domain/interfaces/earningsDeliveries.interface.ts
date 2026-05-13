export interface EarningsDeliveriesInterface {
    earning_id?: number;
    user_id: string;
    purchase_id: number;
    amount: number;
    status: string;
    available_at?: Date | string | null;
    reference_id?: string | null;
    created_at?: Date | string;
    type: string;
}
