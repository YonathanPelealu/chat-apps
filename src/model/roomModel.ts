import {
	actionType,
	anyObjectType,
	roomDataType,
} from "../interfaces/general_interface";
import roomService from "../services/roomService";

const updateUserInRoom = async (
	room_id: string,
	action: actionType,
	user_id: string
): Promise<anyObjectType> => {
	try {
		const { data } = await roomService.getCurrentUserInRoom(room_id);
		let new_users_lists = data.user_ids;
		action == "join"
			? new_users_lists.push(user_id)
			: new_users_lists.filter(
					(users: any) => !new_users_lists.includes(users)
			  );
		return await roomService.updateUserInRoom(room_id, new_users_lists);
	} catch (e) {
		throw new Error(e);
	}
};

const getRoomLists = async (
	client_id: string,
	type: string,
	user_id: string
): Promise<anyObjectType> => {
	try {
		return await roomService.getRoomLists(client_id, type, user_id);
	} catch (e) {
		throw new Error(e);
	}
};

const getRoomById = async (room_id: string): Promise<anyObjectType> => {
	try {
		return await roomService.getRoomById(room_id);
	} catch (e) {
		throw new Error(e);
	}
};

const createRoom = async (
	client_id: string,
	data: roomDataType
): Promise<anyObjectType> => {
	try {
		return await roomService.createRoom(client_id, data);
	} catch (e) {
		throw new Error(e);
	}
};
const getRoomTypeLists = async (clients_id: string): Promise<anyObjectType> => {
	try {
		return await roomService.getRoomTypeLists(clients_id);
	} catch (e) {
		throw new Error(e);
	}
};
export default {
	updateUserInRoom,
	getRoomLists,
	getRoomById,
	createRoom,
	getRoomTypeLists,
};
