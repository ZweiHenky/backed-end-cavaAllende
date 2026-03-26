import { TypeInterface } from "../interfaces/type.interface.js"

export class TypeEntity implements TypeInterface {
    constructor(
        public id: number,
        public name: string,
    ) {}

    static fromJSON(json: TypeInterface): TypeEntity {
        return new TypeEntity(
            json.id,
            json.name
        )
    }

    toJSON(): TypeInterface {
        return {
            id: this.id,
            name: this.name
        }
    }
}