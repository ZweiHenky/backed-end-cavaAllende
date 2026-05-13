import { Server, Socket } from "socket.io";

interface ConnectionHandlerInterface {
    io: Server;
    socket: Socket;
}

export const connectionHandler = ({ io, socket }: ConnectionHandlerInterface) => {

    
    socket.on("joinRoom", (idRoom: string) => {
        if (!socket.rooms.has('room-' + idRoom)) {
            socket.join('room-' + idRoom);
            console.log("user joined room", idRoom);
        }
    });

    socket.on("clientLocation", (data) => {

        socket.to(`room-${data.purchase_id}`).emit("clientLocation", {
        latitude: data.latitude,
        longitude: data.longitude
        });

    });

    socket.on("deliveryLocation", (data) => {

        socket.to(`room-${data.purchase_id}`).emit("deliveryLocation", {
        latitude: data.latitude,
        longitude: data.longitude
        });

    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
}