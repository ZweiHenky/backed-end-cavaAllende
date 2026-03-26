export const PURCHASE_ITEMS_TABLE = {
    TABLE_NAME: "purchase_items",
    COLUMNS:{
        PURCHASE_ITEM_ID:"purchase_item_id",
        PURCHASE_ID:"purchase_id",
        PRODUCT_ID:"product_id",
        QUANTITY:"quantity",
        UNIT_PRICE:"unit_price",
        LINE_TOTAL:"line_total"
    }
} as const