import { Server } from "socket.io";
import { connectionHandler } from "#socket/connectionHandler.js";

let io: Server;

export const initSocket = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        connectionHandler({ io, socket });
    });
}

export const getIo = () => {
    if (!io) {
        throw new Error("Socket not initialized");
    }
    return io;
}
