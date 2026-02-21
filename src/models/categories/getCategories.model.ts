import { sql } from "#config/db.js"

export const getAllCategoriesModel = async () => {
    const res = await sql`SELECT * FROM categories`
    return res
}
