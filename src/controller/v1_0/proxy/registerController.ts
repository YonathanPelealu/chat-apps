import constant from "../../../constants/general";
import { RegistrationDataType } from "../../../interfaces/proxyInterface";
import { encoder } from "../../helper/encoder";
import { initFunc } from "../chat/interface";
import convert from "../../helper/compressImage";

const register:initFunc = async(req,res) => {
    const {username,password} = req.body;
    try {
		let result = "";
        if (req.file) {
			const filePath = `static/uploads/${req.file.filename}`;
			result = convert.convertToWebp(filePath, filePath);
		}
        const encodedData = await encoder(username,password)
        const data:RegistrationDataType = {
            ...req.body
        }
        // res.json(encodedData)
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