import { socketNS } from "../connections/socket";
import { anyObjectType } from "./../interfaces/general_interface";

export const socketMiddleware: (
	req: anyObjectType,
	res: anyObjectType,
	next: () => void
) => Promise<void> = async (req, res, next) => {
	try {
		if (req.headers["client-id"] === "kriya") {
			if (socketNS["kriya"].listenerCount("connection") < 1) {
				socketNS["kriya"].on("connection", (socket) => {
					console.log("connect from middleware");

					socket.on("join", (room_id) => {
						socket.join(room_id);
						console.log(
							`client socket_id: ${socket.id} joining room: ${room_id}`
						);
					});
					socket.on("leave", (room_id) => {
						socket.leave(room_id);
						console.log(
							`client socket_id: ${socket.id} leaving room: ${room_id}`
						);
					});
					socket.on("disconnect", () => {
						console.log("client disconected", socket.id);
					});
				});
			}
		} else {
			res.status(401).send("Invalid client id");
		}
	} catch (e) {
		throw Error(e);
	} finally {
		next();
	}
};
