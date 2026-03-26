import { getProductsStockModel } from "#models/products/getProducts.model.js";

export const validateStockService = async (items: { product: { product_id: number; name: string }, quantity: number }[]) => {
    const productIds = items.map(item => item.product.product_id);
    const dbStock = await getProductsStockModel(productIds);
    const outOfStock: any[] = [];
    
    for (const item of items) {
        const dbProduct = dbStock.find((p: any) => p.product_id === item.product.product_id);
        if (!dbProduct || dbProduct.stock < item.quantity) {
            outOfStock.push({
                product_id: item.product.product_id,
                name: item.product.name,
                requested: item.quantity,
                available: dbProduct ? dbProduct.stock : 0
            });
        }
    }

    if (outOfStock.length > 0) {
        throw {
            status: 400,
            message: "Insufficient stock for some products.",
            data: outOfStock
        };
    }

    return true; // Validated successfully
};
