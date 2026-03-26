import { PurchaseItemInsert } from "../interfaces/purchaseItems.interface.js"

export class PurchaseItemEntity implements PurchaseItemInsert {
    constructor(
        public purchase_id: number,
        public product_id: number,
        public quantity: number,
        public unit_price: number,
        public line_total: number,
    ) {}

    static fromJSON(json: PurchaseItemInsert): PurchaseItemEntity {
        return new PurchaseItemEntity(
            json.purchase_id,
            json.product_id,
            json.quantity,
            json.unit_price,
            json.line_total
        )
    }

    toJSON(): PurchaseItemInsert {
        return {
            purchase_id: this.purchase_id,
            product_id: this.product_id,
            quantity: this.quantity,
            unit_price: this.unit_price,
            line_total: this.line_total
        }
    }
}
