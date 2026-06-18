import { pool } from "#config/db.js";
import { LocationEntity } from "#domain/entities/location.entity.js";
import { LocationInterface } from "#domain/interfaces/location.interface.js";

export const createLocation = async (location: LocationInterface) => {
    try {
        const locationCreated = await pool.query(`INSERT INTO locations (latitude, longitude, text_address) VALUES ($1, $2, $3) RETURNING *`, [location.latitude, location.longitude, location.text_address]);
        return LocationEntity.fromJSON(locationCreated.rows[0]);
    } catch (error) {
        throw error;
    }
}