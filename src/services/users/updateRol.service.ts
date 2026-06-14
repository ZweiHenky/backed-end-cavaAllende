import { updateRolModel } from "#models/users/updateRol.js";
import { UserEntity } from "#domain/entities/user.entity.js";
import { getUserByIdModel } from "#models/users/getUserById.model.js";

export const updateRolService = async (userId: string, role: string): Promise<UserEntity> => {

    const user = await getUserByIdModel(userId);
    
    if (!user) {
        throw new Error("User not found");
    }

    const updatedUser = await updateRolModel(userId, role);

    return updatedUser;
};
