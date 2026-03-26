export class GetPurchaseDetailDto {
    constructor(public id: string) {}

    static create(params: any): [GetPurchaseDetailDto | null, Error | null] {
        const { id } = params;

        if (!id) {
            return [null, new Error("purchase id parameter is required")];
        }

        return [new GetPurchaseDetailDto(id), null];
    }
}
