export interface ProductInterface {
    id: number;
    name: string;
    price: number;
    stock: number;
    category_id: number;
    image: string;
    is_active?: boolean;
    producer?: string;
    variant?: string;
    fermentation?: string;
    vintages?: string;
    temperature?: string;
    noise?: string;
    view?: string;
    mouth?: string;
    recomendation?: string;
    type_id?: number;
}

export interface ReduceStockItem {
    product: {
        product_id: number;
        stock?: number;
    };
    quantity: number;
}
