import db from "../connections/db/postgre";
import { anyObjectType } from "../interfaces/general_interface";

const updateUserInRoom = async (
    room_id:string,
    new_user_lists:string[]
):Promise<void> => {
    try {
        const query =`UPDATE room SET users_ids = $1 where room_id = $2`;
        const params = [new_user_lists,room_id]
        await db.query(query,params)
    } catch (e) {
        throw new Error(e)
    }
};
const getCurrentUserInRoom = async (
    room_id:string
):Promise<anyObjectType> => {
    try {
        const query = `SELECT * FROM room WHERE room.id = $1`;
        const params = [room_id];
        const {rows} = await db.query(query,params)
        return rows
    } catch (e) {
        throw new Error(e)
    }
}
export default {
    updateUserInRoom,
    getCurrentUserInRoom
};
