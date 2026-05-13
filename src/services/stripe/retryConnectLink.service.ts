import { createLink } from "#config/stripe/connect/createLink.js";
import { RetryConnectLinkDto } from "#domain/dtos/stripe/retryConnectLink.dto.js";

export const retryConnectLinkService = async (dto: RetryConnectLinkDto) => {
    const accountLink = await createLink(dto.accountId);

    if (!accountLink.url) {
        throw new Error("Could not generate a new onboarding link");
    }

    return {
        onboardingUrl: accountLink.url,
    };
};
