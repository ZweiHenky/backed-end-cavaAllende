import { pool } from "#config/db.js"

export const getProductsModel = async () => {
    const res = await pool.query(`SELECT * FROM products`)
    return res.rows
}

export const getProductByIdModel = async (id: number) => {
    const res = await pool.query(`SELECT * FROM products WHERE product_id = $1`, [id])
    return res.rows[0]
}


export const getProductsByCategoryPaginationModel = async (categoryId: number, limit: number, offset: number, typeId?: number) => {
    const products = typeId
        ? await pool.query(`
            SELECT * FROM products 
            WHERE category_id = $1 AND type_id = $2
            AND stock > 0
            LIMIT $3 OFFSET $4
        `, [categoryId, typeId, limit, offset])
        : await pool.query(`
            SELECT * FROM products 
            WHERE category_id = $1 
            AND stock > 0
            LIMIT $2 OFFSET $3
        `, [categoryId, limit, offset])

    const total = typeId
        ? await pool.query(`
            SELECT count(*) FROM products 
            WHERE category_id = $1 AND type_id = $2
            AND stock > 0
        `, [categoryId, typeId])
        : await pool.query(`
            SELECT count(*) FROM products 
            WHERE category_id = $1
            AND stock > 0
        `, [categoryId])

    return {
        products: products.rows,
        total: total.rows[0].count
    }
}


export const searchProductsByNameModel = async (name: string, limit: number, offset: number, typeId?: number) => {
    const searchTerm = `%${name}%`

    const products = typeId
        ? await pool.query(`
            SELECT * FROM products 
            WHERE name ILIKE $1 AND type_id = $2
            AND stock > 0
            LIMIT $3 OFFSET $4
        `, [searchTerm, typeId, limit, offset])
        : await pool.query(`
            SELECT * FROM products 
            WHERE name ILIKE $1
            AND stock > 0
            LIMIT $2 OFFSET $3
        `, [searchTerm, limit, offset])

    const total = typeId
        ? await pool.query(`
            SELECT count(*) FROM products 
            WHERE name ILIKE $1 AND type_id = $2
            AND stock > 0
        `, [searchTerm, typeId])
        : await pool.query(`
            SELECT count(*) FROM products 
            WHERE name ILIKE $1
            AND stock > 0
        `, [searchTerm])

    return {
        products: products.rows,
        total: total.rows[0].count
    }
}

export const getProductsStockModel = async (productIds: number[]) => {
    if (!productIds || productIds.length === 0) return []
    const res = await pool.query(`
        SELECT product_id, stock, name 
        FROM products 
        WHERE product_id = ANY($1)
    `, [productIds])
    return res.rows
}
