export class CreateLinkDto {
    constructor(
        public accountId: string,
    ) {}

    static create(body: any): [CreateLinkDto | null, Error | null] {
        const { accountId } = body;

        if (!accountId || typeof accountId !== 'string') {
            return [null, new Error("Valid accountId is required")];
        }

        return [new CreateLinkDto(accountId), null];
    }
}
