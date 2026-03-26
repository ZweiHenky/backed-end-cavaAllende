export interface PurchaseItemInsert {
    purchase_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    line_total: number;
}