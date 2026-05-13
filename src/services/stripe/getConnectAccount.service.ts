import { getAccount } from "#config/stripe/connect/getAccount.js";

export const getConnectAccountService = async (accountId: string) => {
    const account = await getAccount(accountId);

    if (!account) {
        throw new Error("Stripe account not found");
    }

    return account;
};
