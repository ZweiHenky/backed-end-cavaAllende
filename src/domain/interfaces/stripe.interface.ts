export interface IStripe {
    stripe_id?: string;
    user_id: string;
    amount: number;
    is_active: boolean;
}