import { pool } from "#config/db.js";
import { UserEntity } from "#domain/entities/user.entity.js";

export const updateRolModel = async (userId: string, role: string): Promise<UserEntity> => {
    try {
        const result = await pool.query(`
            UPDATE "user" SET role = $1 WHERE id = $2 RETURNING *`, [role, userId]);
        return UserEntity.fromObject(result.rows[0]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}