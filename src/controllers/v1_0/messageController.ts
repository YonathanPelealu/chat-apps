import { messageDataType } from "../../interfaces/general_interface";
import messageModel from "../../model/messageModel";
import { initFunc } from "./interface";
import constant from "../../constants/general";
import { socketNS } from "../../connections/socket";
import convert from "../helper/compressImage";

const addMessage: initFunc = async (req, res) => {
	const { client_id, user_id } = req.client;
	const { room_id } = req.query;
	try {
		const data: messageDataType = { ...req.body };
		let result = '';
		if (req.file){
			const filePath = `static/uploads/${req.file.filename}`;
			result = convert.convertToWebp(filePath, filePath);
		};
		const message_data = {
			...data,
			path: result,
			sent_by: user_id,
			is_deleted: false,
		};

		if (req.headers["client-id"] === "kriya") {
			socketNS["kriya"].to(room_id).emit("message", message_data);
		}

		const { message } = await messageModel.addMessage(client_id, message_data);
		res.json({
			status: constant.RESPONSE_STATUS_SUCCESS,
			message,
		});
	} catch (e) {
		res.constant;
	}
};

const getMessageOnRoom: initFunc = async (req, res) => {
	const { room_id, page } = req.query;

	if (req.headers["client-id"] === "kriya") {
		if (socketNS["kriya"].listenerCount("connection") < 1) {
			socketNS["kriya"].on("connection", (socket) => {
				socket.on("join", (room) => {
					console.log(`client socket_id: ${socket.id} joining room: ${room}`);
					socket.join(room);
				});
				socket.on("disconnect", () => {
					console.log("client disconected", socket.id);
				});
			});
		}
	}

	try {
		const result = await messageModel.getMessageOnRoom(room_id, page);
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
