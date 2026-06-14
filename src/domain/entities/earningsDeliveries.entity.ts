import { EarningsDeliveriesInterface } from "../interfaces/earningsDeliveries.interface.js"

export class EarningsDeliveriesEntity implements EarningsDeliveriesInterface {
    constructor(
        public user_id: string,
        public purchase_id: number,
        public amount: number,
        public status: string,
        public type: string,
        public earning_id?: number,
        public available_at?: Date | string | null,
        public payout_id?: string | null,
        public created_at?: Date | string,
    ) { }

    static fromJSON(json: any): EarningsDeliveriesEntity {
        return new EarningsDeliveriesEntity(
            json.user_id,
            json.purchase_id,
            json.amount,
            json.status,
            json.type,
            json.earning_id,
            json.available_at,
            json.payout_id,
            json.created_at
        );
    }

    toJSON(): any {
        return {
            earning_id: this.earning_id,
            user_id: this.user_id,
            purchase_id: this.purchase_id,
            amount: this.amount,
            status: this.status,
            available_at: this.available_at,
            payout_id: this.payout_id,
            created_at: this.created_at,
            type: this.type
        };
    }
}
