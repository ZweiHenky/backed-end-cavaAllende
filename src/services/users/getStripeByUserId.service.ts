import { getStripeByUserIdModel } from "#models/users/getStripeByUserId.model.js";

export const getStripeByUserIdService = async (userId: string) => {
    const account = await getStripeByUserIdModel(userId);

    if (!account) {
        throw new Error("Stripe account not found");
    }

    return account;
};
