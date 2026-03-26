export class SearchProductsByNameDto {
    constructor(
        public name: string,
        public page: number,
        public limit: number,
        public offset: number,
        public type_id?: number
    ) {}

    static create(query: any): [SearchProductsByNameDto | null, Error | null] {
        const name = query.name as string;

        if (!name || name.trim() === '') {
            return [null, new Error("The 'name' query parameter is required")];
        }

        const page = parseInt(query.page as string) || 1;
        const limit = parseInt(query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const type_id = query.type_id ? Number(query.type_id) : undefined;

        return [new SearchProductsByNameDto(name, page, limit, offset, type_id), null];
    }
}
