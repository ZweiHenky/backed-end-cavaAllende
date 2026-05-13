import { addEarningModel } from "#models/earningsDeliveries/addEarning.model.js";
import { CreateEarningDto } from "#domain/dtos/earningsDeliveries/createEarning.dto.js";

export const addEarningService = async (data: CreateEarningDto) => {
    return await addEarningModel(data);
};
