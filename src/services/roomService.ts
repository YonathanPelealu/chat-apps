import db from "../connections/db/postgre";
import {
	anyObjectType,
	roomDataType,
	snackbarType,
} from "../interfaces/general_interface";

const updateUserInRoom = async (
	room_id: string,
	new_user_lists: string[]
): Promise<snackbarType> => {
	let message: string = "";
	try {
		const query = `UPDATE room SET users_ids = $1 where room_id = $2`;
		const params = [new_user_lists, room_id];
		const result = await db.query(query, params);
		result
			? (message = "success add new client")
			: (message = "failed add new client");
		return { message };
	} catch (e) {
		throw new Error(e);
	}
};

/*
  this below function is used on room model "update user in room" 
  to get latest user in room, before updating user lists
*/

const getCurrentUserInRoom = async (
	room_id: string
): Promise<anyObjectType> => {
	try {
		const query = `SELECT * FROM room WHERE room.id = $1`;
		const params = [room_id];
		const { rows } = await db.query(query, params);
		return rows;
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
		const check = await db.query(`
		SELECT max(created_at) as last_seen
		from activity_log
		where user_id = $1`,[user_id])
		const { last_seen }:any = check.rows[0]
		
		let query = `
		SELECT room.id id,
						room.data as data,
						room.user_ids as user_ids,
						JSON_BUILD_OBJECT(
							'message_id',messages.id,
							'text',messages.text,
							'path',messages.path,
							'is_deleted',messages.is_deleted,
							'last_update',room_latest_msg.updated_at
						) AS latest_msg_data,
						JSON_BUILD_OBJECT(
							'unread_count',msg.unread
						) AS activity,
					room_latest_msg.updated_at AS last_msg
					FROM room 
					LEFT JOIN room_latest_msg ON room_latest_msg.room_id = room.id
					LEFT JOIN messages ON messages.id = room_latest_msg.message_id
					LEFT JOIN (
						SELECT 
						count(messages.id) as unread,
						messages.room_id
						from messages
						where messages.created_at::timestamp > $4::timestamp
						group by messages.room_id
						)msg on msg.room_id = room.id
					WHERE room.clients_id = $1 
					AND room.is_active = true 
					AND room.is_deleted = false
					AND room.data->>'type' = $3
					AND $2 = ANY(room.user_ids)
					group by room.id,messages.id,room_latest_msg.updated_at,room_latest_msg.updated_at,msg.unread
			ORDER BY last_msg
		`;
		let params = [client_id, user_id, type,last_seen];
		let { rows }:any = await db.query(query, params);
		console.log(rows,{last_seen})
		// rows = {
		// 	activity:{
		// 		unread_count: rows.activity.unread_count ? rows.activity.unread_count : 0,
		// 		last_seen 
		// 	}
		// }
		return rows;
	} catch (e) {
		throw new Error(e);
	}
};

const getRoomById = async (room_id: string): Promise<anyObjectType> => {
	try {
		const query = `SELECT * FROM room WHERE id = $1`;
		const params = [room_id];
		const { rows } = await db.query(query, params);
		return rows[0];
	} catch (e) {
		throw new Error(e);
	}
};

const createRoom = async (
	client_id: string,
	data: roomDataType
): Promise<anyObjectType> => {
	try {
		const query = `INSERT INTO room (clients_id,data, is_deleted, user_ids) VALUES ($1,$2,$3,$4) RETURNING id`;
		let message: string = "";
		const params = [
			client_id,
			{ type: data.type, name: data.name },
			false,
			data.user_ids,
		];
		const result: any = await db.query(query, params);

		result
			? (message = "success add new room")
			: (message = "failed add new room");

		return { message, id: result.rows[0].id };
	} catch (e) {
		throw new Error(e);
	}
};
const getRoomTypeLists = async (clients_id: string): Promise<anyObjectType> => {
	try {
		const query = `SELECT clients.data->'chat_type' as type
        FROM clients WHERE id = $1`;
		const params = [clients_id];
		const result: any = await db.query(query, params);
		return result?.rows[0]?.type;
	} catch (e) {
		throw new Error(e);
	}
};
export default {
	updateUserInRoom,
	getCurrentUserInRoom,
	getRoomLists,
	getRoomById,
	createRoom,
	getRoomTypeLists,
};
