import { Server } from "socket.io";

export const sendChangeStatus = (io: Server, id: string, status: string, user_id?: string) => {

    if (user_id) {
        console.log("user", status, user_id);
        io.to(`room-${user_id}`).emit("statusUpdated", status);
    }

    console.log("purchase", status, id);
    io.to(`room-${id}`).emit("statusUpdated", status);
};