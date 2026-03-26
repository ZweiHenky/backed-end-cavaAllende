export class ValidateStockDto {
    constructor(public items: { product: { product_id: number; name: string }, quantity: number }[]) {}

    static create(body: any): [ValidateStockDto | null, Error | null] {
        const items = body as { product: { product_id: number; name: string }, quantity: number }[];

        if (!Array.isArray(items) || items.length === 0) {
            return [null, new Error("Invalid or empty product list provided.")];
        }

        // Add additional checks if needed (e.g. valid product_id and quantity)
        for (const item of items) {
            if (!item.product || !item.product.product_id || typeof item.quantity !== 'number') {
                return [null, new Error("Each item must have a valid product object and quantity.")];
            }
        }

        return [new ValidateStockDto(items), null];
    }
}
