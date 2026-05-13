export class ValidateStockDto {
    constructor(public items: { product: { product_id: number; name: string }, quantity: number }[]) {}

    static create(body: any): [ValidateStockDto | null, Error | null] {
        const items = body.order_items;

        if (!Array.isArray(items) || items.length === 0) {
            return [null, new Error("Invalid or empty product list provided.")];
        }

        for (const item of items) {
            if (!item.product || !item.product.product_id || typeof item.quantity !== 'number') {
                return [null, new Error("Each item must have a valid product object and quantity.")];
            }
        }

        return [new ValidateStockDto(items), null];
    }
}
