export class RetryConnectLinkDto {
    constructor(
        public accountId: string,
    ) {}

    static create(body: any): [RetryConnectLinkDto | null, Error | null] {
        const { accountId } = body;

        if (!accountId || typeof accountId !== 'string') {
            return [null, new Error("Valid accountId is required")];
        }

        return [new RetryConnectLinkDto(accountId), null];
    }
}
