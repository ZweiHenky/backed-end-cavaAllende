import { IStripe } from "../interfaces/stripe.interface.js";

export class StripeEntity implements IStripe {
    constructor(
        public user_id: string,
        public amount: number,
        public is_active: boolean,
        public stripe_id?: string,
    ) {}

    static fromJSON(json: IStripe): StripeEntity {
        return new StripeEntity(
            json.user_id,
            json.amount,
            json.is_active,
            json.stripe_id
        )
    }

    toJSON(): IStripe {
        return {
            user_id: this.user_id,
            amount: this.amount,
            is_active: this.is_active,
            stripe_id: this.stripe_id
        }
    }
}