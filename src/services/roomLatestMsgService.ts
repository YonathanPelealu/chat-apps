import db from "../connections/db/postgre";
import { anyObjectType } from "../interfaces/general_interface";

const createLatestMsgInRoom = async (room_id:string,message_id:string,user_id:string):Promise<any> => {
    try {
        let response;
        const query = `INSERT INTO room_latest_msg (room_id,message_id,user_id) VALUES ($1,$2,$3)`;
        const params = [room_id,message_id,user_id] ;
        const rows = await db.query(query,params);
        response = rows.rowCount > 0 ? 'message sent' : `failed send message`   
        return response 
    } catch (e) {
        throw new Error(e)
    }
}
const checkExistingRoom = async(room_id:string):Promise<anyObjectType> => {
    try {
        const query = `SELECT * from room_latest_msg where room_id = $1`;
        const params = [room_id]
        const {rows} = await db.query(query,params)
        return rows
    } catch (e) {
        throw new Error(e)
    }
}
const updateLatestMsgInRoom = async (room_id:string,message_id:string):Promise<any> => {
    try {
        let response;
        const query = `UPDATE room_latest_msg SET message_id = $1, user_id = $2`;
        const params = [message_id,room_id];
        const rows = await db.query(query,params)
        response = rows.rowCount > 0 ? 'message sent' : `failed send message`  
        return response 
    } catch (e) {
        throw new Error(e)
    }
}
const getLatestMessageForRoom = async (room_id:string):Promise<anyObjectType> => {
    try {
        const query = `
        SELECT 
        m_data.* as message_data,
        room.data->>'name' as room_name
        FROM room_latest_msg rlm
        LEFT JOIN (
            SELECT 
                id ,
                text ,
                sent_by 
            FROM messages
        ) m_data on m_data.id = rlm.message_id
        LEFT JOIN room on rlm.room_id = room.id
        WHERE rlm.room_id = $1
        `;
        const params = [room_id];
        const {rows} = await db.query(query,params)
        return rows
    } catch (e) {
        throw new Error(e)
    }
}
export default {
    updateLatestMsgInRoom,
    createLatestMsgInRoom,
    checkExistingRoom,
    getLatestMessageForRoom
}
