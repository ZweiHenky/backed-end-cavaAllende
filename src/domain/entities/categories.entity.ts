import { CategoryInterface } from "../interfaces/categories.interface.js"

export class CategoryEntity implements CategoryInterface {
    constructor(
        public id: number,
        public name: string,
    ) {}

    static fromJSON(json: CategoryInterface): CategoryEntity {
        return new CategoryEntity(
            json.id,
            json.name
        )
    }

    toJSON(): CategoryInterface {
        return {
            id: this.id,
            name: this.name
        }
    }
}