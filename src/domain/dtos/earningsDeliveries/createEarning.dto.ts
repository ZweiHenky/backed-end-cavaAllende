interface CreateEarningDtoInterface {
    user_id: string;
    purchase_id: number;
    amount: number;
    status: string;
    type: string;
}

export class CreateEarningDto {
    constructor(
        public user_id: string,
        public purchase_id: number,
        public amount: number,
        public status: string,
        public type: string
    ) {}

    static create(body: CreateEarningDtoInterface): [CreateEarningDto | null, Error | null] {
        const { user_id, purchase_id, amount, status, type } = body;

        if (!user_id) return [null, new Error("user_id is required")];
        if (!purchase_id) return [null, new Error("purchase_id is required")];
        if (!amount) return [null, new Error("amount is required")];
        if (!status) return [null, new Error("status is required")];
        if (!type) return [null, new Error("type is required")];

        return [new CreateEarningDto(user_id, purchase_id, amount, status, type), null];
    }
}
