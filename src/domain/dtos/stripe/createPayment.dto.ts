export class CreatePaymentDto {
    constructor(
        public amount: number,
        public currency: string,
        public metadata: { 
            email: string; 
            userId: string; 
            order: {
                purchase_id: number;
                purchase_items: any[];
                shipping_address: string;
                shipping_cost: number;
                subtotal: number;
                taxes: number;
                total: number;
                user_id: string;
            }
            location: {
                latitude: number;
                longitude: number;
                text_address: string;
            }
        }
    ) {}

    static create(body: any): [CreatePaymentDto | null, Error | null] {
        const { amount, currency, metadata } = body;

        if (!amount || typeof amount !== 'number') {
            return [null, new Error("Valid amount is required")];
        }

        if (!currency) {
            return [null, new Error("Currency is required")];
        }

        if (!metadata || !metadata.email || !metadata.userId || !metadata.order) {
            return [null, new Error("Valid metadata (email, userId, order) is required")];
        }

        if (!metadata.location.latitude || !metadata.location.longitude || !metadata.location.text_address) {
            return [null, new Error("Valid metadata (location) is required")];
        }

        return [new CreatePaymentDto(amount, currency, metadata), null];
    }
}
