import { Server } from "socket.io";

export const sendCreatePurchase = (io: Server, id: string) => {
    io.emit("purchaseCreated", id);
}