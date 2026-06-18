import { pool } from "#config/db.js"
import { CreateProductDto } from "#domain/dtos/createProduct.dto.js"


export const createProductModel = async (data: CreateProductDto) => {

    const {
        name, price, stock, category_id, image, is_active,
        producer, variant, fermentation, vintages, temperature,
        noise, view, mouth, recomendation, type_id, description, region
    } = data

    const res = await pool.query(`
        INSERT INTO products (
            name, price, stock, category_id, image, is_active,
            producer, variant, fermentation, vintages, temperature, 
            noise, view, mouth, recomendation, type_id, description, region
        ) 
        VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11, 
            $12, $13, $14, $15, $16, $17, $18
        )
        RETURNING *
    `, [
        name,
        price,
        stock,
        category_id,
        image,
        is_active,
        producer,
        variant,
        fermentation,
        vintages,
        temperature,
        noise,
        view,
        mouth,
        recomendation,
        type_id,
        description,
        region
    ]);

    if (res.rows.length === 0) {
        throw new Error("Product not created")
    }

    return res.rows[0]
}