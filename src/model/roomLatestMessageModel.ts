import { anyObjectType } from "../interfaces/general_interface"
import roomLatestMsgService from "../services/roomLatestMsgService"

const getLatestMessageForRoom = async (room_id:string):Promise<anyObjectType> => {
    try {
      return  await roomLatestMsgService.getLatestMessageForRoom(room_id)
    } catch (e) {
        throw new Error(e)
    }
}
 export default {
    getLatestMessageForRoom
}
    