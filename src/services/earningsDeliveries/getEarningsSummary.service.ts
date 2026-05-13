import { getEarningsSummaryModel } from "#models/earningsDeliveries/getEarningsSummary.model.js";

export const getEarningsSummaryService = async (user_id: string) => {
    return await getEarningsSummaryModel(user_id);
};
