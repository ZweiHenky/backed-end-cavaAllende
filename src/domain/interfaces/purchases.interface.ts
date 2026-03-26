export interface PurchaseInsert {
    user_id?: string | null;
    subtotal: number;
    discount?: number;
    taxes?: number;
    shipping_cost?: number;
    total: number;
    payment_method: string;
    payment_reference?: string | null;
    status?: string;
    shipping_address?: string | null;
    notes?: string | null;
}
