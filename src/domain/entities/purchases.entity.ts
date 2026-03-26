import { PurchaseInsert } from "../interfaces/purchases.interface.js"

export class PurchaseEntity implements PurchaseInsert {
    constructor(
        public subtotal: number,
        public total: number,
        public payment_method: string,
        public user_id?: string | null,
        public discount?: number,
        public taxes?: number,
        public shipping_cost?: number,
        public payment_reference?: string | null,
        public status?: string,
        public shipping_address?: string | null,
        public notes?: string | null,
    ) {}

    static fromJSON(json: PurchaseInsert): PurchaseEntity {
        return new PurchaseEntity(
            json.subtotal,
            json.total,
            json.payment_method,
            json.user_id,
            json.discount,
            json.taxes,
            json.shipping_cost,
            json.payment_reference,
            json.status,
            json.shipping_address,
            json.notes
        )
    }

    toJSON(): PurchaseInsert {
        return {
            subtotal: this.subtotal,
            total: this.total,
            payment_method: this.payment_method,
            user_id: this.user_id,
            discount: this.discount,
            taxes: this.taxes,
            shipping_cost: this.shipping_cost,
            payment_reference: this.payment_reference,
            status: this.status,
            shipping_address: this.shipping_address,
            notes: this.notes
        }
    }
}
