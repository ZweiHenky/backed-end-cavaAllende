import { sql } from "#config/db.js";
import { LocationEntity } from "#domain/entities/location.entity.js";

export const getLocationByField = async (text_address: string, latitude: number, longitude: number) => {
    try {
        const location = await sql`SELECT * FROM locations WHERE text_address = ${text_address} OR latitude = ${latitude} OR longitude = ${longitude}`;
       
        if (!location[0]) {
            return null;
        }

        return LocationEntity.fromJSON(location[0]);
    } catch (error) {
        throw error;
    }
}