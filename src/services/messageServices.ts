import {
	anyObjectType,
	messageDataType,
	snackbarType,
} from "../interfaces/general_interface";
import db from "../connections/db/postgre";
const addMessage = async (data: messageDataType): Promise<anyObjectType> => {
	try {
		const { room_id, sent_by, path, text, is_deleted } = data;
		const query = `INSERT INTO messages (room_id,sent_by,path,text,is_deleted) VALUES ($1,$2,$3,$4,$5) RETURNING id`;
		const params = [room_id, sent_by, path, text, is_deleted];
		const { rows } = await db.query(query, params);
		return rows[0];
	} catch (e) {
		throw new Error(e);
	}
};
const getMessageOnRoom = async (
	room_id: string,
	page: string
): Promise<anyObjectType> => {
	try {
		const offset = Number(page) * 20;
		const query = `
		SELECT * 
		FROM messages 
		WHERE messages.room_id = $1 
		AND messages.is_active = true 
		LIMIT 20 OFFSET $2
		`;
		const params = [room_id, offset];
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
