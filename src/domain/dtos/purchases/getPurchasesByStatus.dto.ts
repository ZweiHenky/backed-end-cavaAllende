export class GetPurchasesByStatusDto {
    constructor(public status: string, public user_id?: string) {}

    static create(query: any): [GetPurchasesByStatusDto | null, Error | null] {
        const { status, user_id } = query;

        if (!status) {
            return [null, new Error("status query parameter is required")];
        }

        return [new GetPurchasesByStatusDto(String(status), String(user_id)), null];
    }
}
