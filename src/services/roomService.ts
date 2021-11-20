import db from "../connections/db/postgre";
import { anyObjectType, roomDataType, snackbarType } from "../interfaces/general_interface";

const updateUserInRoom = async (
    room_id:string,
    new_user_lists:string[]
):Promise<snackbarType> => {
    let message:string = "";
    try {
        const query =`UPDATE room SET users_ids = $1 where room_id = $2`;
        const params = [new_user_lists,room_id]
        const result = await db.query(query,params)
        result ? message = 'success add new client' : message = 'failed add new client';
        return {message}
    } catch (e) {
        throw new Error(e)
    }
};


/*
  this below function is used on room model "update user in room" 
  to get latest user in room, before updating user lists
*/


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
const getRoomLists = async (
    user_id:string,
    client_id:string
):Promise<anyObjectType> => {
    try {
        const query = `SELECT * FROM room WHERE room.clients_id = $1 AND user_id = any(room.data->>"user_ids")`;
        const params = [client_id,user_id]
        const {rows} = await db.query(query,params)
        return rows
    } catch (e) {
        throw new Error(e)
    }
}
const createRoom = async (
    client_id:string,
    data:roomDataType,
):Promise<snackbarType> => {
    try {
        let message:string = "";
            const query =`INSERT INTO room (client_id,data,is_deleted) VALUES ($1,$2,$3)`;
            const params = [client_id,data,false]
            const result = await db.query(query,params)
            result ? message = 'success add new room' : message = 'failed add new room';
            return {message}
    } catch (e) {
        throw new Error(e)
    }
}
export default {
    updateUserInRoom,
    getCurrentUserInRoom,
    getRoomLists,
    createRoom
};
