import { sql } from "#config/db.js"
import { UpdateProductDto } from "#domain/dtos/products/updateProduct.dto.js"

export const updateProductModel = async (data: UpdateProductDto) => {
    const {
        id, name, price, stock, category_id, image, is_active,
        producer, variant, fermentation, vintages, temperature,
        noise, view, mouth, recomendation, type_id, description, region
    } = data

    const res = await sql`
        UPDATE products
        SET
            name          = COALESCE(${name ?? null}, name),
            price         = COALESCE(${price ?? null}, price),
            stock         = COALESCE(${stock ?? null}, stock),
            category_id   = COALESCE(${category_id ?? null}, category_id),
            image         = COALESCE(${image ?? null}, image),
            is_active     = COALESCE(${is_active ?? null}, is_active),
            producer      = COALESCE(${producer ?? null}, producer),
            variant       = COALESCE(${variant ?? null}, variant),
            fermentation  = COALESCE(${fermentation ?? null}, fermentation),
            vintages      = COALESCE(${vintages ?? null}, vintages),
            temperature   = COALESCE(${temperature ?? null}, temperature),
            noise         = COALESCE(${noise ?? null}, noise),
            view          = COALESCE(${view ?? null}, view),
            mouth         = COALESCE(${mouth ?? null}, mouth),
            recomendation = COALESCE(${recomendation ?? null}, recomendation),
            type_id       = COALESCE(${type_id ?? null}, type_id),
            description   = COALESCE(${description ?? null}, description),
            region        = COALESCE(${region ?? null}, region)
        WHERE product_id = ${id}
        RETURNING *
    `

    if (res.length === 0) {
        throw new Error("Product not found")
    }

    return res[0]
}
