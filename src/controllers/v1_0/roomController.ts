import { initFunc } from "./interface";
import constant from "../../constants/general";
import roomModel from "../../model/roomModel";
import roomService from "../../services/roomService";
import {
	deleteGroupDataType,
	roomDataType,
} from "../../interfaces/general_interface";
import { errorHandler } from "../../handler/errorHandler";

const updateUserInRoom: initFunc = async (req, res) => {
	const { room_id, action, user_id } = req.query;
	try {
		const { message } = await roomModel.updateUserInRoom(
			room_id,
			action,
			user_id
		);
		res.json({
			status: constant.RESPONSE_STATUS_SUCCESS,
			message,
		});
	} catch (e) {
		res.json({
			status: constant.RESPONSE_STATUS_FAILED,
			message: e.toString(),
		});
	}
};

const getRoomLists: initFunc = async (req, res) => {
	const { user_id, client_id } = req.client;
	const { type } = req.query;
	try {
		const result = await roomModel.getRoomLists(
			client_id,
			type.toLowerCase(),
			user_id
		);
		res.json(result);
	} catch (e) {
		res.json({
			status: constant.RESPONSE_STATUS_FAILED,
			message: e.toString(e),
		});
	}
};

const getRoomById: initFunc = async (req, res) => {
	const { room_id } = req.query;
	try {
		const result = await roomModel.getRoomById(room_id);
		res.json(result);
	} catch (e) {
		res.json({
			status: constant.RESPONSE_STATUS_FAILED,
			message: e.toString(e),
		});
	}
};

const createRoom: initFunc = async (req, res) => {
	const { client_id } = req.client;
	try {
		const data: roomDataType = req.body;

		const { message, id } = await roomModel.createRoom(client_id, data);
		res.json({
			status: constant.RESPONSE_STATUS_SUCCESS,
			message,
			id,
		});
	} catch (e) {
		res.json({
			status: constant.RESPONSE_STATUS_FAILED,
			message: e.toString(),
		});
	}
};
const getRoomTypeLists: initFunc = async (req, res) => {
	const { client_id } = req.client;
	try {
		const result = await roomModel.getRoomTypeLists(client_id);
		res.json(result);
	} catch (e) {
		res.json({
			status: constant.RESPONSE_STATUS_FAILED,
			message: e.toString(),
		});
	}
};

const deleteRoom: initFunc = async (req, res) => {
	const { client_id } = req.client;
	const { room_id, custom_id } = req.query;
	try {
		let data: deleteGroupDataType = {
			clients_id: client_id,
		};
		room_id ? (data.room_id = room_id) : (data.custom_id = custom_id);
		const { message } =
			room_id || custom_id
				? await roomModel.deleteRoom(data)
				: { message: "cannot find custom_id or room_id" };
		res.json({
			status: constant.RESPONSE_STATUS_SUCCESS,
			message,
		});
	} catch (e) {
		res.json({
			status: constant.RESPONSE_STATUS_FAILED,
		});
		errorHandler(e);
	}
};
export default {
	updateUserInRoom,
	getRoomLists,
	getRoomById,
	createRoom,
	getRoomTypeLists,
	deleteRoom,
};
