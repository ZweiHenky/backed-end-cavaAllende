export class GetProductsByCategoryDto {
    constructor(
        public category_id: number,
        public page: number,
        public limit: number,
        public offset: number,
        public type_id?: number
    ) {}

    static create(query: any): [GetProductsByCategoryDto | null, Error | null] {
        const category_id = Number(query.category_id);
        const page = parseInt(query.page as string) || 1;
        const limit = parseInt(query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const type_id = query.type_id ? Number(query.type_id) : undefined;

        if (!category_id || category_id === 0) {
            return [null, new Error("The 'category_id' query parameter is required")];
        }

        return [new GetProductsByCategoryDto(category_id, page, limit, offset, type_id), null];
    }
}
