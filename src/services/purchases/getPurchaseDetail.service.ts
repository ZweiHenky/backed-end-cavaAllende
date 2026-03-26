import { getPurchaseDetailModel } from "#models/purchases/getPurchaseDetail.model.js";

export const getPurchaseDetailService = async (id: string) => {
    return await getPurchaseDetailModel(id);
};
