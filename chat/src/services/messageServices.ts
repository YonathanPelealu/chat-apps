import { anyObjectType } from "../interfaces/general_interface";
import db from "../connections/db/postgre";

const addMessage = async (room_id:string,user_id:string,path:string,messages:string):Promise<void> => {
    try {
        const query = `INSERT INTO messages (room_id,sent_by,path,text) VALUES ($1,$2,$3,$4)`;
        const params = [room_id,user_id,path,messages];
        await db.query(query,params)
    } catch (e) {
        throw new Error(e)
    }
};
const getMessageOnRoom = async (room_id:string):Promise<anyObjectType> => {
    try {
        const query = `SELECT * FROM messages WHERE message.room_id = $1 AND messages.is_active = true`;
        const params = [room_id];
        const {rows} = await db.query(query,params)
        return rows
    } catch (e) {
        throw new Error(e)
    }
};
export default {
    addMessage,
    getMessageOnRoom
};