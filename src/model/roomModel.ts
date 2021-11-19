import roomService from "../services/roomService"

const updateUserInRoom = async (room_id:string,action:string,user_id:string):Promise<void> =>{
    try {
        const {user_ids} = await roomService.getCurrentUserInRoom(room_id)
        let new_users_lists = user_ids;
        action == 'join' ?  user_ids.push(user_id) : new_users_lists = user_ids.filter((users:any) => !new_users_lists.includes(users))
        await roomService.updateUserInRoom(room_id,new_users_lists)
    } catch (e) {
        throw new Error(e)
    }
}

export default {
    updateUserInRoom
}