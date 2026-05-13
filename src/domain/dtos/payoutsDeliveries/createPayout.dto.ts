interface CreatePayoutDtoInterface {
    user_id?: string;
    total_amount?: number;
    status?: string;
    payment_method?: string;
}

export class CreatePayoutDto {
    constructor(
        public user_id?: string,
        public total_amount?: number,
        public status?: string,
        public payment_method?: string
    ) {}

    static create(body: CreatePayoutDtoInterface): [CreatePayoutDto | null, Error | null] {
        const { user_id, total_amount, status, payment_method } = body;
        return [new CreatePayoutDto(user_id, total_amount, status, payment_method), null];
    }
}
