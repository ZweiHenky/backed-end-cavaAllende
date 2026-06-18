import { pool } from "#config/db.js"

export const getAllCategoriesModel = async () => {
    const res = await pool.query(`SELECT DISTINCT categories.id, categories.name
                                FROM categories
                                INNER JOIN products
                                ON categories.id = products.category_id;`)
    return res.rows
}
