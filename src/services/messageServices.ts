import {
	anyObjectType,
	messageDataType,
	snackbarType,
} from "../interfaces/general_interface";
import db from "../connections/db/postgre";

const addMessage = async (data: messageDataType): Promise<snackbarType> => {
	let message: string = "";
	try {
		const { room_id, sent_by, path, text, is_deleted } = data;
		const query = `INSERT INTO messages (room_id,sent_by,path,text,is_deleted) VALUES ($1,$2,$3,$4,$5)`;
		const params = [room_id, sent_by, path, text, is_deleted];
		const res = await db.query(query, params);
		res
			? (message = "success send message")
			: (message = "Failed send message");
		return { message };
	} catch (e) {
		throw new Error(e);
	}
};
const getMessageOnRoom = async (room_id: string): Promise<anyObjectType> => {
	try {
		const query = `SELECT * FROM messages WHERE message.room_id = $1 AND messages.is_active = true`;
		const params = [room_id];
		const { rows } = await db.query(query, params);
		return rows;
	} catch (e) {
		throw new Error(e);
	}
};
export default {
	addMessage,
	getMessageOnRoom,
};
