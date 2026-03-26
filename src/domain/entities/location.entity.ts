export class LocationEntity {
    constructor(
        public location_id: number,
        public latitude: number,
        public longitude: number,
        public text_address: string
    ) {}

    static fromJSON(object: { [key: string]: any }): LocationEntity {
        const { location_id, latitude, longitude, text_address } = object;
        return new LocationEntity(location_id, latitude, longitude, text_address);
    }

    static toJSON(location: LocationEntity): { location_id: number; latitude: number; longitude: number; text_address: string } {
        const { location_id, latitude, longitude, text_address } = location;
        return {
            location_id,
            latitude,
            longitude,
            text_address
        };
    }
}