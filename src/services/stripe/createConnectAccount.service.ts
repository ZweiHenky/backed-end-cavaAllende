import { createAccount } from "#config/stripe/connect/createAccount.js";
import { CreateConnectAccountDto } from "#domain/dtos/stripe/createConnectAccount.dto.js";
import { createStripe } from "#models/stripe/create.js";
import { updateRolModel } from "#models/users/updateRol.js";

export const createConnectAccountService = async (dto: CreateConnectAccountDto) => {
    const account = await createAccount(dto.email, dto.name);

    if (!account.id) {
        throw new Error("Connect account could not be created");
    }

    const newAccount = await createStripe({
        user_id: dto.user_id,
        amount: 0,
        is_active: false,
        stripe_id: account.id,
    });

    if (!newAccount) {
        throw new Error("Stripe account could not be created");
    }

    const updatedUser = await updateRolModel(dto.user_id, "delivery");

    if (!updatedUser) {
        throw new Error("User could not be updated");
    }

    return {
        accountId: account.id
    };
};
