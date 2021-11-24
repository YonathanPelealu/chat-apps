import { anyObjectType, messageDataType, snackbarType } from "../interfaces/general_interface"
import activityLogService from "../services/activityLogService"
import messageServices from "../services/messageServices"
import roomLatestMsgService from "../services/roomLatestMsgService";

const addMessage = async (
    client_id:string,
    data:messageDataType
):Promise<any> => {
    try {
        const msg = await messageServices.addMessage(data);
        await activityLogService.addActivityLog(client_id,data.sent_by,data.room_id)
        const last_msg = await roomLatestMsgService.checkExistingRoom(data.room_id)
        const response = last_msg.length == 0
        ? await roomLatestMsgService.createLatestMsgInRoom(data.room_id,msg.id,data.sent_by) 
        : await roomLatestMsgService.updateLatestMsgInRoom(data.room_id,msg.id)
        return response
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
