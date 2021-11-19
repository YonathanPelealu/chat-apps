import constant from "../constants/general";

import validator from "validator";

import * as authMiddleware from "../middleware/authMiddleware";

import { initFunc } from "./v1_0/interface";

const login: initFunc = async (req, res) => {
	const { phone, password } = req.body;
	const isValidated = validator.isMobilePhone(phone) && password.length >= 6;
	if (isValidated) {
		try {
			const token = await authMiddleware.generateToken(phone, password);
			res.json(token);
		} catch (e) {
			res.json({
				status: constant.RESPONSE_STATUS_FAILED,
				message: e,
			});
		}
	} else {
		res.json({
			status: constant.RESPONSE_STATUS_FAILED,
			message: "Invalid phone number or password format",
		});
	}
};

export default {
	login,
};
