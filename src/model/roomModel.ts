import {
	actionType,
	anyObjectType,
	roomDataType,
	messageDataType,
	deleteGroupDataType,
} from "../interfaces/general_interface";
import activityLogService from "../services/activityLogService";
import roomService from "../services/roomService";
import messageModel from "./messageModel";

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
		const result = await roomService.getRoomLists(client_id, type, user_id);
		// const tempData = result
		
		// const newRes = result.sort((a:any,b:any) =>  {
		// 	console.log("update", a?.latest_msg_data?.last_update)
		// 	console.log("created", a?.created_at)
			
			// return (b?.latest_msg_data?.last_update ? b.latest_msg_data.last_update : b.created_at) -
			// (a?.latest_msg_data?.last_update ? a.latest_msg_data.last_update : a.created_at)  
			// a.latest_msg_data.last_update != null ? a.latest_msg_data.last_update - 
			// b.latest_msg_data.last_update : a.created_at - b.latest_msg_data.last_update 
		// }
		// )
		// console.log(result)
		// return newRes
		const tempData = result.map((data:any) => {
			if (!data.latest_msg_data.last_update) {
				data.latest_msg_data.last_update = data.created_at
			} else {
				data.latest_msg_data.last_update
			}
			delete data.created_at;
			return data
		});
		// console.log(tempData)
		const sortedData = tempData.sort((a:any,b:any) => {
			const c = new Date(a.latest_msg_data.last_update).getTime();
			const d = new Date(b.latest_msg_data.last_update).getTime();
			return d > c ? 1 : -1 ;
			// return b.latest_msg_data.last_update > a.latest_msg_data.last_update ? 1 : -1;
		})

		return sortedData;
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
		const { id, message } = await roomService.createRoom(client_id, data);
		// const dataInit: messageDataType = {
		// 	room_id: id,
		// 	path: "",
		// 	text: "",
		// 	sent_by: "system",
		// 	is_deleted: false,
		// };
		/* 
		datainit means to send empty message when creating new room 
		to prevent null value on room_latest message property when get room list by type
		if the null value exists, it will always placed on the top of the room lists
		*/
		// await messageModel.addMessage(client_id, dataInit);

		/**
		 * add activity_log of all assigned user(s) into newly created room
		 */
		// await Promise.all([
		// 	data.user_ids.forEach((user:any)=> {
		// 	activityLogService.addActivityLog(client_id,user,id)
		// })])
		return { id, message };
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

const deleteRoom = async (data: deleteGroupDataType): Promise<any> => {
	try {
		return await roomService.deleteRoom(data);
	} catch (e) {}
};
export default {
	updateUserInRoom,
	getRoomLists,
	getRoomById,
	createRoom,
	getRoomTypeLists,
	deleteRoom,
};
