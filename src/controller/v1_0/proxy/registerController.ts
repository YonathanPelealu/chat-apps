import constant from "../../../constants/general";
import { RegistrationDataType } from "../../../interfaces/proxyInterface";
import { initFunc } from "../chat/interface";
import convert from "../../helper/compressImage";
import proxyModel from "../../../model/proxyModel";
import { path } from "../../../../__root";

const register:initFunc = async(req,res) => {
    try {
		let result = "";
        if (req.file) {
			const filePath = `static/uploads/${req.file.filename}`;
			result = convert.convertToWebp(filePath, filePath);
		}
        const data:RegistrationDataType = {
            ...req.body,
            path:`${path}/${result}`
        }
        const resp = await proxyModel.register(data)
        res.json(resp)
    } catch (e) {
        res.json({
            status: constant.RESPONSE_STATUS_FAILED,
            message: e.toString()
        })
    }
}

export default {
    register
}