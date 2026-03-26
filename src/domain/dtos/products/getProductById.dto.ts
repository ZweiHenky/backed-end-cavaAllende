export class GetProductByIdDto {
    constructor(public id: number) {}

    static create(params: any): [GetProductByIdDto | null, Error | null] {
        const id = Number(params.id);

        if (!id || isNaN(id)) {
            return [null, new Error("Valid product id parameter is required")];
        }

        return [new GetProductByIdDto(id), null];
    }
}
