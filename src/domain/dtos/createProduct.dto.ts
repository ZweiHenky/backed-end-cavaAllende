import { ProductInterface } from "#domain/interfaces/product.interface.js"

export class CreateProductDto {
    constructor(
        public name: string,
        public price: number,
        public stock: number,
        public category_id: number,
        public image: string,
        public is_active?: boolean,
        public producer?: string,
        public variant?: string,
        public fermentation?: string,
        public vintages?: string,
        public temperature?: string,
        public noise?: string,
        public view?: string,
        public mouth?: string,
        public recomendation?: string,
    ) {}

    static create(data: ProductInterface): [CreateProductDto | null, Error | null] {

        const {
            name, price, stock, category_id, image, is_active,
            producer, variant, fermentation, vintages, temperature, 
            noise, view, mouth, recomendation
        } = data

        if (!name) {
            return [null, new Error("Name is required")]
        }

        if (!price) {
            return [null, new Error("Price is required")]
        }

        if (!stock) {
            return [null, new Error("Stock is required")]
        }

        if (!category_id) {
            return [null, new Error("Category id is required")]
        }

        if (!image) {
            return [null, new Error("Image is required")]
        }

        return [new CreateProductDto(
            name, price, stock, category_id, image, is_active,
            producer, variant, fermentation, vintages, temperature, 
            noise, view, mouth, recomendation
        ), null]
    }
}