import { anyObjectType } from "../interfaces/general_interface"
import messageServices from "../services/messageServices"

const addMessage = async (
    room_id:string,
    user_id:string,
    path:string,
    messages:string
):Promise<void> => {
    try {
        await messageServices.addMessage(room_id,user_id,path,messages)
    } catch (e) {
        throw new Error(e)
    }
}
const getMessageOnRoom = async (room_id:string):Promise<anyObjectType> => {
    try {
        return await messageServices.getMessageOnRoom(room_id)
    } catch (e) {
        throw new Error(e)
    }
}
export default {
    addMessage,
    getMessageOnRoom
}
