import { anyObjectType, messageDataType, snackbarType } from "../interfaces/general_interface"
import messageServices from "../services/messageServices"

const addMessage = async (
    data:messageDataType
):Promise<anyObjectType> => {
    try {
       return await messageServices.addMessage(data)
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
