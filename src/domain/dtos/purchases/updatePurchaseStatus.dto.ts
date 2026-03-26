export class UpdatePurchaseStatusDto {
    constructor(public id: string, public status: string) {}

    static create(params: any, body: any): [UpdatePurchaseStatusDto | null, Error | null] {
        const { id } = params;
        const { status } = body;

        if (!id) {
            return [null, new Error("purchase id parameter is required")];
        }

        if (!status) {
            return [null, new Error("status is required")];
        }

        return [new UpdatePurchaseStatusDto(String(id), String(status)), null];
    }
}
