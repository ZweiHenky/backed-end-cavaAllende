import { PayoutsDeliveriesInterface } from "../interfaces/payoutsDeliveries.interface.js"

export class PayoutsDeliveriesEntity implements PayoutsDeliveriesInterface {
    constructor(
        public payout_id?: number,
        public user_id?: string | null,
        public total_amount?: number | null,
        public status?: string | null,
        public payment_method?: string | null,
        public created_at?: Date | string | null,
    ) {}

    static fromJSON(json: any): PayoutsDeliveriesEntity {
        return new PayoutsDeliveriesEntity(
            json.payout_id,
            json.user_id,
            json.total_amount,
            json.status,
            json.payment_method,
            json.created_at
        );
    }

    toJSON(): any {
        return {
            payout_id: this.payout_id,
            user_id: this.user_id,
            total_amount: this.total_amount,
            status: this.status,
            payment_method: this.payment_method,
            created_at: this.created_at
        };
    }
}
