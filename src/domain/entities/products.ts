import { ProductInterface } from "#domain/interfaces/product.interface.js";

class ProductEntity implements ProductInterface {
    constructor(
        public id: number,
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

    static fromJSON(json: ProductInterface): ProductEntity {
        return new ProductEntity(
            json.id,
            json.name,
            json.price,
            json.stock,
            json.category_id,
            json.image,
            json.is_active,
            json.producer,
            json.variant,
            json.fermentation,
            json.vintages,
            json.temperature,
            json.noise,
            json.view,
            json.mouth,
            json.recomendation
        )
    }

    toJSON(): ProductInterface {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            stock: this.stock,
            category_id: this.category_id,
            image: this.image,
            is_active: this.is_active,
            producer: this.producer,
            variant: this.variant,
            fermentation: this.fermentation,
            vintages: this.vintages,
            temperature: this.temperature,
            noise: this.noise,
            view: this.view,
            mouth: this.mouth,
            recomendation: this.recomendation
        }
    }
}

export default ProductEntity