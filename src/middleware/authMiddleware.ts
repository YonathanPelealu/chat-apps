import { anyObjectType } from "../interfaces/general_interface";
import clientService from "../services/clientService";

export type PayloadType = {
	client_id: string;
	client_key: string;
	client_secret: string;
	user_id: string;
};

const validateClientID = async (payload: PayloadType) => {
	try {
		const result = await clientService.validateClientID(payload);
		if (result) {
			return result;
		} else {
			return false;
		}
	} catch (e) {
		throw new Error(e);
	}
};

const authMiddleware: (
	req: anyObjectType,
	res: anyObjectType,
	next: () => void
) => Promise<void> = async (req, res, next) => {
	try {
		const validKey = req.headers["client_key"].length >= 12;
		const validSecret = req.headers["client-secret"].length >= 12;

		if (validSecret && validKey) {
			let result = await validateClientID(req.headers.payload);

			if (result?.client_id) {
				result.user_id = req.headers["user-id"];
				req.client = result;

				next();
			} else {
				res.status(401).send("Invalid client id");
			}
		} else {
			res.status(401).send("Invalid key pair format");
		}
	} catch (e) {
		throw Error(e);
	}
};

export default authMiddleware;
