import { initFunc } from "./interface";
import constant from "../../../constants/general";
import roomLatestMessageModel from "../../../model/roomLatestMessageModel";

const getLatestMessageForRoom:initFunc = async (req,res) => {
    const {room_id} = req.query;
    try {
        const r = await roomLatestMessageModel.getLatestMessageForRoom(room_id);
        res.json(r)
    } catch (e) {
        res.json({
            status:constant.RESPONSE_STATUS_FAILED
        })
    }
}
export default {
    getLatestMessageForRoom
}