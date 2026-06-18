import { Server, Socket } from "socket.io";

interface ConnectionHandlerInterface {
    io: Server;
    socket: Socket;
}

const locations = new Map<string, any>();

export const connectionHandler = ({ io, socket }: ConnectionHandlerInterface) => {

    socket.on("joinRoom", (idRoom) => {

        socket.join(`room-${idRoom}`);

        const clientLocation =
            locations.get(`client-${idRoom}`);

        const deliveryLocation =
            locations.get(`delivery-${idRoom}`);

        if (clientLocation) {
            socket.emit("clientLocation", clientLocation);
        }

        if (deliveryLocation) {
            socket.emit("deliveryLocation", deliveryLocation);
        }
    });

    socket.on("clientLocation", (data) => {

        locations.set(`client-${data.purchase_id}`, {
            latitude: data.latitude,
            longitude: data.longitude
        });

        socket.to(`room-${data.purchase_id}`).emit(
            "clientLocation",
            locations.get(`client-${data.purchase_id}`)
        );
    });

    socket.on("deliveryLocation", (data) => {

        locations.set(`delivery-${data.purchase_id}`, {
            latitude: data.latitude,
            longitude: data.longitude
        });

        socket.to(`room-${data.purchase_id}`).emit(
            "deliveryLocation",
            locations.get(`delivery-${data.purchase_id}`)
        );
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
}