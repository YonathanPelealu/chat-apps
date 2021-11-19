import { Server } from "socket.io";

export let useSocket: Server;

export const SocketInit = (socketServer: Server): void => {
	useSocket = socketServer;
};
