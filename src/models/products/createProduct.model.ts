import { sql } from "#config/db.js"
import { CreateProductDto } from "#domain/dtos/createProduct.dto.js"


export const createProductModel = async (data: CreateProductDto) => {

    const {
        name, price, stock, category_id, image, is_active,
        producer, variant, fermentation, vintages, temperature, 
        noise, view, mouth, recomendation
    } = data

    const res = await sql`
        INSERT INTO products (
            name, price, stock, category_id, image, is_active,
            producer, variant, fermentation, vintages, temperature, 
            noise, view, mouth, recomendation
        ) 
        VALUES (
            ${name}, ${price}, ${stock}, ${category_id}, ${image}, ${is_active},
            ${producer}, ${variant}, ${fermentation}, ${vintages}, ${temperature}, 
            ${noise}, ${view}, ${mouth}, ${recomendation}
        )
        RETURNING *
    `

    if (res.length === 0) {
        throw new Error("Product not created")
    }

    return res
}