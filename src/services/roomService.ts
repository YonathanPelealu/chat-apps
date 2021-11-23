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
    client_id:string,
    type?:string,
    user_id?:string
):Promise<anyObjectType> => {
    try {
        let count = 1;
        let query = `SELECT * FROM room WHERE room.clients_id = $1 AND room.is_active = true AND room.is_deleted = false`;
        let params = [client_id]

        if (type) {
            count ++
            query += ` AND room.data->>'type' = $${count}`;
            params.push(type)
        }
        if (user_id) {
            count ++
            query += ` AND room.data->'user_ids' ? $${count}`
            // json_array_elements(room.data->'user_ids') <--
            params.push(user_id)
        }
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
            const query =`INSERT INTO room (clients_id,data,is_deleted) VALUES ($1,$2,$3)`;
            const params = [client_id,data,false]
            const result = await db.query(query,params)
            result ? message = 'success add new room' : message = 'failed add new room';
            return {message}
    } catch (e) {
        throw new Error(e)
    }
}
const getRoomTypeLists = async (clients_id:string):Promise<anyObjectType> => {
    try {
        const query = `SELECT clients.data->>'chat_type' as type FROM clients WHERE id = $1`;
        const params = [clients_id];
        const {rows} = await db.query(query,params);
        return (rows);
    } catch (e) {
        throw new Error(e)
    }
}
export default {
    updateUserInRoom,
    getCurrentUserInRoom,
    getRoomLists,
    createRoom,
    getRoomTypeLists
};
