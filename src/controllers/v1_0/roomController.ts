import { initFunc } from "./interface"
import constant from "../../constants/general";
import roomModel from "../../model/roomModel";
import roomService from "../../services/roomService";
import { roomDataType } from "../../interfaces/general_interface";

const updateUserInRoom:initFunc = async ( req,res ) => {
    const { room_id,action,user_id } = req.query;
    try {
        const { message } = await roomModel.updateUserInRoom(room_id,action,user_id)
        res.json({
            status : constant.RESPONSE_STATUS_SUCCESS,
            message
        })
    } catch (e) {
        res.json ({
            status: constant.RESPONSE_STATUS_FAILED,
            message: e.toString()
        })
    }
}
const getRoomLists:initFunc = async (req,res) => {
    const {user_id,client_id} = req.query;
    try {
        const result = await roomModel.getRoomLists(user_id,client_id)
        res.json(result)
    } catch (e) {
        res.json({
            status:constant.RESPONSE_STATUS_FAILED,
            message: e.toString(e)
        })
    }
}
const createRoom:initFunc = async (req,res) => {
    console.log(req.clients_id)
    try {
        const data:roomDataType = {...req.body}
        return
        // const {message} = await roomService.createRoom(client_id,data)
        res.json({
            status:constant.RESPONSE_STATUS_SUCCESS,
            // message
        })
    } catch (e) {
        res.json({
            status:constant.RESPONSE_STATUS_FAILED,
            message: e.toString()
        })
    }
}
export default {
    updateUserInRoom,
    getRoomLists,
    createRoom
}