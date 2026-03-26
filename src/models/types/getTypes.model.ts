import { sql } from "#config/db.js"

export const getAllTypesModel = async () => {
    const res = await sql`SELECT * FROM types`
    return res
}
