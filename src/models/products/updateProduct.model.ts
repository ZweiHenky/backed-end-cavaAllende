import { pool } from "#config/db.js"
import { UpdateProductDto } from "#domain/dtos/products/updateProduct.dto.js"

export const updateProductModel = async (data: UpdateProductDto) => {
    const {
        id, name, price, stock, category_id, image, is_active,
        producer, variant, fermentation, vintages, temperature,
        noise, view, mouth, recomendation, type_id, description, region
    } = data

    const res = await pool.query(`
        UPDATE products
        SET
            name          = COALESCE($1, name),
            price         = COALESCE($2, price),
            stock         = COALESCE($3, stock),
            category_id   = COALESCE($4, category_id),
            image         = COALESCE($5, image),
            is_active     = COALESCE($6, is_active),
            producer      = COALESCE($7, producer),
            variant       = COALESCE($8, variant),
            fermentation  = COALESCE($9, fermentation),
            vintages      = COALESCE($10, vintages),
            temperature   = COALESCE($11, temperature),
            noise         = COALESCE($12, noise),
            view          = COALESCE($13, view),
            mouth         = COALESCE($14, mouth),
            recomendation = COALESCE($15, recomendation),
            type_id       = COALESCE($16, type_id),
            description   = COALESCE($17, description),
            region        = COALESCE($18, region)
        WHERE product_id = $19
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
        region,
        id
    ])

    if (res.rows.length === 0) {
        throw new Error("Product not found")
    }

    return res.rows[0]
}
