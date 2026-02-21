import { sql } from "#config/db.js"

export const getProductsModel = async () => {
    const res = await sql`SELECT * FROM products`
    return res
}

export const getProductByIdModel = async (id: number) => {
    const res = await sql`SELECT * FROM products WHERE product_id = ${id}`
    return res
}


export const getProductsByCategoryPaginationModel = async (categoryId: number, limit: number, offset: number) => {
    const products = await sql`
        SELECT * FROM products 
        WHERE category_id = ${categoryId} 
        LIMIT ${limit} OFFSET ${offset}
    `
    const total = await sql`
        SELECT count(*) FROM products 
        WHERE category_id = ${categoryId}
    `
    return {
        products,
        total: total[0].count
    }
}

