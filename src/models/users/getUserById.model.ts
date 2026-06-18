import { UserEntity } from "#domain/entities/user.entity.js";
import { pool } from "#config/db.js";

export const getUserByIdModel = async (userId: string): Promise<UserEntity> => {
    try {
        const result = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [userId]);

        if (result.rows.length === 0) {
            throw new Error("User not found");
        }

        return UserEntity.fromObject(result.rows[0]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}