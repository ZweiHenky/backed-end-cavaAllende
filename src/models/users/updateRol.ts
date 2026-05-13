import { sql } from "#config/db.js";

export const updateRolModel = async (userId: string, role: string) => {
    try {
        const result = await sql`
            UPDATE "user" SET role = ${role} WHERE id = ${userId} RETURNING *`;
        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}