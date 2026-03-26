import { sql } from "#config/db.js";
import { LocationEntity } from "#domain/entities/location.entity.js";
import { LocationInterface } from "#domain/interfaces/location.interface.js";

export const createLocation = async (location: LocationInterface) => {
    try {
        const locationCreated = await sql`INSERT INTO locations (latitude, longitude, text_address) VALUES (${location.latitude}, ${location.longitude}, ${location.text_address}) RETURNING *`;
        return LocationEntity.fromJSON(locationCreated[0]);
    } catch (error) {
        throw error;
    }
}