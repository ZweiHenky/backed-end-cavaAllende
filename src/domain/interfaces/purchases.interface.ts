export interface PurchaseInsert {
    user_id?: string | null;
    subtotal: number;
    discount?: number;
    taxes?: number;
    shipping_cost?: number;
    total: number;
    payment_method: string;
    payment_reference?: string | null;
    status?: TStatus;
    shipping_address?: string | null;
    notes?: string | null;
    delivery_id?: string;
    location_id?: number;
    secure_code?: string | null;
}

type TStatus = "pending" | "paid" | "accepted" | "on_the_way" | "completed" | "cancelled" | "collecting";
