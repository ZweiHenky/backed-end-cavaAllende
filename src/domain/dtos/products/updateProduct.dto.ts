export class UpdateProductDto {
    constructor(
        public id: number,
        public name?: string,
        public price?: number,
        public stock?: number,
        public category_id?: number,
        public image?: string,
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
        public type_id?: number,
        public description?: string,
        public region?: string,
    ) {}

    static create(id: string, body: any): [UpdateProductDto | null, Error | null] {
        const parsedId = parseInt(id)

        if (isNaN(parsedId) || parsedId <= 0) {
            return [null, new Error("Invalid product id")]
        }

        const {
            name, price, stock, category_id, image, is_active,
            producer, variant, fermentation, vintages, temperature,
            noise, view, mouth, recomendation, type_id, description, region
        } = body

        const hasAtLeastOneField =
            name !== undefined || price !== undefined || stock !== undefined ||
            category_id !== undefined || image !== undefined || is_active !== undefined ||
            producer !== undefined || variant !== undefined || fermentation !== undefined ||
            vintages !== undefined || temperature !== undefined || noise !== undefined ||
            view !== undefined || mouth !== undefined || recomendation !== undefined ||
            type_id !== undefined || description !== undefined || region !== undefined

        if (!hasAtLeastOneField) {
            return [null, new Error("At least one field must be provided to update")]
        }

        return [new UpdateProductDto(
            parsedId,
            name, price !== undefined ? Number(price) : undefined,
            stock !== undefined ? Number(stock) : undefined,
            category_id !== undefined ? Number(category_id) : undefined,
            image, is_active, producer, variant, fermentation,
            vintages, temperature, noise, view, mouth, recomendation,
            type_id !== undefined ? Number(type_id) : undefined,
            description, region
        ), null]
    }
}
