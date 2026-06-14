import { UserEntity } from "#domain/entities/user.entity.js";
import { sql } from "#config/db.js";

export const getUserByIdModel = async (userId: string): Promise<UserEntity> => {
    try {
        const result = await sql`SELECT * FROM "user" WHERE id = ${userId}`;

        if (result.length === 0) {
            throw new Error("User not found");
        }

        return UserEntity.fromObject(result[0]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}