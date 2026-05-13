export class CreatePaymentDto {
    constructor(
        public amount: number,
        public currency: string,
        public shippingCost: number,
        public metadata: { 
            email: string; 
            userId: string; 
            order: {
                order_items:{
                    product:{
                        product_id:number,
                        stock:number | undefined,
                        price:number
                    },
                    quantity:number
                }[],
            },
            location: {
                latitude: number;
                longitude: number;
                text_address: string;
            }
        }
    ) {}

    static create(body: any): [CreatePaymentDto | null, Error | null] {
        const { amount, currency, metadata, shippingCost } = body;

        if (!amount || typeof amount !== 'number') {
            return [null, new Error("Valid amount is required")];
        }

        if (!currency) {
            return [null, new Error("Currency is required")];
        }

        if (!metadata || !metadata.email || !metadata.userId || !metadata.order) {
            return [null, new Error("Valid metadata (email, userId, order) is required")];
        }
        
        if (metadata.order.order_items.length === 0) {
            return [null, new Error("Valid metadata (order_items) is required")];
        }

        for (const item of metadata.order.order_items) {
            if (!item.product || !item.product.product_id || !item.product.stock || !item.product.price) {
                return [null, new Error("Valid metadata (order_items.product) is required")];
            }
            if (!item.quantity || typeof item.quantity !== 'number') {
                return [null, new Error("Valid metadata (order_items.quantity) is required")];
            }
        }

        if (!metadata.location.latitude || !metadata.location.longitude || !metadata.location.text_address) {
            return [null, new Error("Valid metadata (location) is required")];
        }

        if (!shippingCost || typeof shippingCost !== 'number') {
            return [null, new Error("Valid shippingCost is required")];
        }

        return [new CreatePaymentDto(amount, currency, shippingCost, metadata), null];
    }
}
