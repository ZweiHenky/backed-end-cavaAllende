import { sql } from "#config/db.js"

export const getProductsModel = async () => {
    const res = await sql`SELECT * FROM products`
    return res
}

export const getProductByIdModel = async (id: number) => {
    const res = await sql`SELECT * FROM products WHERE product_id = ${id}`
    return res
}


export const getProductsByCategoryPaginationModel = async (categoryId: number, limit: number, offset: number, typeId?: number) => {
    const products = typeId
        ? await sql`
            SELECT * FROM products 
            WHERE category_id = ${categoryId} AND type_id = ${typeId}
            LIMIT ${limit} OFFSET ${offset}
        `
        : await sql`
            SELECT * FROM products 
            WHERE category_id = ${categoryId} 
            LIMIT ${limit} OFFSET ${offset}
        `

    const total = typeId
        ? await sql`
            SELECT count(*) FROM products 
            WHERE category_id = ${categoryId} AND type_id = ${typeId}
        `
        : await sql`
            SELECT count(*) FROM products 
            WHERE category_id = ${categoryId}
        `

    return {
        products,
        total: total[0].count
    }
}


export const searchProductsByNameModel = async (name: string, limit: number, offset: number, typeId?: number) => {
    const searchTerm = `%${name}%`

    const products = typeId
        ? await sql`
            SELECT * FROM products 
            WHERE name ILIKE ${searchTerm} AND type_id = ${typeId}
            LIMIT ${limit} OFFSET ${offset}
        `
        : await sql`
            SELECT * FROM products 
            WHERE name ILIKE ${searchTerm}
            LIMIT ${limit} OFFSET ${offset}
        `

    const total = typeId
        ? await sql`
            SELECT count(*) FROM products 
            WHERE name ILIKE ${searchTerm} AND type_id = ${typeId}
        `
        : await sql`
            SELECT count(*) FROM products 
            WHERE name ILIKE ${searchTerm}
        `

    return {
        products,
        total: total[0].count
    }
}

export const getProductsStockModel = async (productIds: number[]) => {
    if (!productIds || productIds.length === 0) return []
    const res = await sql`
        SELECT product_id, stock 
        FROM products 
        WHERE product_id = ANY(${productIds})
    `
    return res
}
