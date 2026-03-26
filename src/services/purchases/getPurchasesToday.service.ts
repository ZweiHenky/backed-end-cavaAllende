import { getPurchasesTodayModel } from "#models/purchases/getPurchasesToday.model.js";

export const getPurchasesTodayService = async () => {
    return await getPurchasesTodayModel();
};
