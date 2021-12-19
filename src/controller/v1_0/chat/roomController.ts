import { initFunc } from "./interface";
import constant from "../../../constants/general";
import roomModel from "../../../model/roomModel";
import roomService from "../../../services/roomService";
import { roomDataType } from "../../../interfaces/general_interface";

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

		const { message, id } = await roomService.createRoom(client_id, data);
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
export default {
	updateUserInRoom,
	getRoomLists,
	getRoomById,
	createRoom,
	getRoomTypeLists,
};
