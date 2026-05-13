import { addPayoutModel } from "#models/payoutsDeliveries/addPayout.model.js";
import { CreatePayoutDto } from "#domain/dtos/payoutsDeliveries/createPayout.dto.js";

export const addPayoutService = async (data: CreatePayoutDto) => {
    return await addPayoutModel(data);
};
