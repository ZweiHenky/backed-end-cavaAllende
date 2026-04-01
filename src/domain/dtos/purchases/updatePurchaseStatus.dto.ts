interface UpdatePurchaseStatusDtoInterface {
    status: string;
    id: number;
}

export class UpdatePurchaseStatusDto {
    constructor(public status: string, public id: number) {}

    static create(body: UpdatePurchaseStatusDtoInterface): [UpdatePurchaseStatusDto | null, Error | null] {
        const { status, id } = body;

        if (!status) {
            return [null, new Error("status is required")];
        }

        if (!id) {
            return [null, new Error("id is required")];
        }

        return [new UpdatePurchaseStatusDto(status, id), null];
    }
}
