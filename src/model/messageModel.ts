import { getMessageDataType } from "../controllers/v1_0/messageController";
import {
	anyObjectType,
	messageDataType,
} from "../interfaces/general_interface";
import activityLogService from "../services/activityLogService";
import messageServices from "../services/messageServices";
import roomLatestMsgService from "../services/roomLatestMsgService";

const addMessage = async (
	client_id: string,
	data: messageDataType
): Promise<any> => {
	try {
		const msg = await messageServices.addMessage(data);
		await activityLogService.addActivityLog(
			client_id,
			data.sent_by,
			data.room_id
		);
		const last_msg = await roomLatestMsgService.checkExistingRoom(data.room_id);
		const response =
			last_msg.length > 0
				? await roomLatestMsgService.updateLatestMsgInRoom(
						data.room_id,
						data.sent_by,
						msg.id
				  )
				: await roomLatestMsgService.createLatestMsgInRoom(
						data.room_id,
						data.sent_by,
						msg.id
				  );
		return response;
	} catch (e) {
		throw new Error(e);
	}
};
const getMessageOnRoom = async (
	data: getMessageDataType
): Promise<anyObjectType> => {
	const { room_id, page, client_id, user_id } = data;
	try {
		const [message_lists] = await Promise.all([
			messageServices.getMessageOnRoom(room_id, page),
			activityLogService.addActivityLog(client_id, user_id, room_id),
		]);
		return message_lists;
	} catch (e) {
		throw new Error(e);
	}
};
export default {
	addMessage,
	getMessageOnRoom,
};
