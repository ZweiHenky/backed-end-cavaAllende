export class CreateConnectAccountDto {
    constructor(
        public email: string,
        public name: string,
        public user_id: string,
    ) {}

    static create(body: any): [CreateConnectAccountDto | null, Error | null] {
        const { email, name, user_id } = body;

        if (!email || typeof email !== 'string') {
            return [null, new Error("Valid email is required")];
        }

        if (!name || typeof name !== 'string') {
            return [null, new Error("Valid name is required")];
        }

        if (!user_id || typeof user_id !== 'string') {
            return [null, new Error("Valid user_id is required")];
        }

        return [new CreateConnectAccountDto(email, name, user_id), null];
    }
}
