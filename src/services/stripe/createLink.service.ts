import { createLink } from "#config/stripe/connect/createLink.js";
import { CreateLinkDto } from "#domain/dtos/stripe/createLink.dto.js";

export const createLinkService = async (dto: CreateLinkDto) => {
    const accountLink = await createLink(dto.accountId);

    if (!accountLink.url) {
        throw new Error("Could not generate a new onboarding link");
    }

    return {
        onboardingUrl: accountLink.url,
    };
};
