import { pool } from "#config/db.js";
import { LocationEntity } from "#domain/entities/location.entity.js";

export const getLocationByField = async (text_address: string, latitude: number, longitude: number) => {
    try {
        const location = await pool.query(`SELECT * FROM locations WHERE text_address = $1 OR latitude = $2 OR longitude = $3`, [text_address, latitude, longitude]);

        if (!location.rows[0]) {
            return null;
        }

        return LocationEntity.fromJSON(location.rows[0]);
    } catch (error) {
        throw error;
    }
}