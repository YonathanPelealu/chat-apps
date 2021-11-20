import { messageDataType } from "../../interfaces/general_interface";
import messageModel from "../../model/messageModel";
import { initFunc } from "./interface";
import constant from "../../constants/general";

const addMessage:initFunc = async (req,res) => {
    try {
        const data:messageDataType = {...req.query}
        const {message} = await messageModel.addMessage(data)
        res.json({
            status: constant.RESPONSE_STATUS_SUCCESS,
            message
        })
    } catch (e) {
        res.constant
    }
}
const getMessageOnRoom:initFunc = async (req,res) => {
    const { room_id } = req.query
    try {
        const result = await messageModel.getMessageOnRoom(room_id)
        res.json(result)
    } catch (e) {
        res.json({
            status: constant.RESPONSE_STATUS_FAILED,
            message: e.toString()
        })
    }
}
export default {
    addMessage,
    getMessageOnRoom
}