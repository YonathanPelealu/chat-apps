import { Namespace, Server } from "socket.io";

// export let useSocket: Server;

type clientType = "kriya"; // | "atto"

type nsType = Record<clientType, Namespace>;

export const socketNS: nsType = {
	kriya: {} as Namespace,
	// atto: {} as Namespace,
};

export const SocketInit = (socketServer: Server): void => {
	// useSocket = socketServer;
	socketNS.kriya = socketServer.of("/KRIYA");

	socketServer.on("disconnect", () => {
		socketServer.removeAllListeners();
	});
};
