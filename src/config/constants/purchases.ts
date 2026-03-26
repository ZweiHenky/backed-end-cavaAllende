export const PURCHASE_TABLE = {
  NAME: "purchase",
  COLUMNS: {
    PURCHASE_ID: "purchase_id",
    USER_ID: "user_id",
    CREATED_AT: "created_at",
    SUBTOTAL: "subtotal",
    DISCOUNT: "discount",
    TAXES: "taxes",
    SHIPPING_COST: "shipping_cost",
    TOTAL: "total",
    PAYMENT_METHOD: "payment_method",
    PAYMENT_REFERENCE: "payment_reference",
    STATUS: "status",
    SHIPPING_ADDRESS: "shipping_address",
    NOTES: "notes",
  },
} as const;