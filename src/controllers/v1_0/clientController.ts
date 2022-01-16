import clientModel from "../../model/clientModel";
import { initFunc } from "./interface";
import constant from "../../constants/general";

const registerClient: initFunc = async (req, res) => {
	const { name, chat_type, description } = req.body;
	try {
		const { message } = await clientModel.registerClient(
			name,
			chat_type,
			description
		);
		res.json({
			status: constant.RESPONSE_STATUS_SUCCESS,
			message,
		});
	} catch (e) {
		res.json({
			status: constant.RESPONSE_STATUS_FAILED,
			message: e.toString(),
		});
	}
};

export default {
	registerClient,
};
