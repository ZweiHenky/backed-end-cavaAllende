import { sql } from "#config/db.js";
import { UserEntity } from "#domain/entities/user.entity.js";

export const updateRolModel = async (userId: string, role: string): Promise<UserEntity> => {
    try {
        const result = await sql`
            UPDATE "user" SET role = ${role} WHERE id = ${userId} RETURNING *`;
        return UserEntity.fromObject(result[0]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}