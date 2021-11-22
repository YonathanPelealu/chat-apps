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
	const { client_id, client_key, client_secret, user_id } = req.headers;

	const payload: PayloadType = {
		client_id,
		client_key,
		client_secret,
		user_id,
	};

	try {
		const validKey = payload.client_key.length >= 12;
		const validSecret = payload.client_secret.length >= 12;

		if (validSecret && validKey) {
			let result = await validateClientID(payload);

			if (result?.client_id) {
				result.user_id = user_id;
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
