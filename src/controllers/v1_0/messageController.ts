import { messageDataType } from "../../interfaces/general_interface";
import messageModel from "../../model/messageModel";
import { initFunc } from "./interface";
import constant from "../../constants/general";
import { socketNS } from "../../connections/socket";

const addMessage: initFunc = async (req, res) => {
	try {
		const data: messageDataType = { ...req.body };
		const { message } = await messageModel.addMessage(data);
		res.json({
			status: constant.RESPONSE_STATUS_SUCCESS,
			message,
		});
	} catch (e) {
		res.constant;
	}
};
const getMessageOnRoom: initFunc = async (req, res) => {
	const { client_id } = req.headers;
	const { room_id } = req.query;
	const { client_name } = req.client;

	if (client_id === "kriya") {
		socketNS["kriya"].on("connection", (socket) => {
			console.log("client connected", socket.id);
			socket.join(room_id);
			socket.on("message", (text) => {
				socket.broadcast.to(room_id).emit("message", text + socket.id);
				console.log(text + socket.id);
			});
			socket.on("disconnect", () => {
				console.log("client disconected", socket.id);
			});
		});
	}
	try {
		const result = await messageModel.getMessageOnRoom(room_id);
		res.json(result);
	} catch (e) {
		res.json({
			status: constant.RESPONSE_STATUS_FAILED,
			message: e.toString(),
		});
	}
};
export default {
	addMessage,
	getMessageOnRoom,
};
