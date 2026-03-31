import { getPurchasesTodayModel } from "#models/purchases/getPurchasesToday.model.js";

export const getPurchasesTodayService = async (statuses: string[]) => {
    return await getPurchasesTodayModel(statuses);
};
