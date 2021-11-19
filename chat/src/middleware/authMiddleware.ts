import { accessListsType } from "../interfaces/access_lists_interfaces";
// import { tokenPayloadType } from "../../interfaces/general_interface";
import { errorHandler } from "./../handler/errorHandler";
import { anyObjectType } from "../interfaces/general_interface";
import { api } from "../connections/external/api";
import dotenv from "../../config";
dotenv();
const oauth_url = `http://127.0.0.1:${process.env.PORT_OAUTH}/oauth`;

type PayloadType = {
	user_id: string;
	user_name: string;
	role_id: string;
	department_ids: string[];
	company_id: string;
	access_lists: accessListsType;
};

interface token_obj {
	token: string;
	issued: Date;
	expired: string;
	data: PayloadType;
}

export const generateToken = async (
	phone: string,
	password: string
): Promise<token_obj> => {
	try {
		const token_object: any = await api({
			baseURL: oauth_url,
			api_path: "/login",
			method: "post",
			request_name: "login",
			data: { phone, password },
		});
		if (token_object) {
			return token_object;
		} else {
			throw "You use wrong phone or password";
		}
	} catch (e) {
		errorHandler(e);
		throw e;
	}
};

export const getToken = (authorization: string): string => {
	const token = authorization.split(" ")[1];
	return token;
};

export const getTokenPayload = async (token: string): Promise<any> => {
	try {
		const payload: any = await api({
			baseURL: oauth_url,
			api_path: "/getTokenPayload",
			method: "post",
			request_name: "get token payload",
			data: { token },
		});
		return payload;
	} catch (e) {
		errorHandler(e);
		throw e;
	}
};

export const getTokenPayloadFromHeaders = async (
	headers: anyObjectType
): Promise<any> => {
	const { authorization } = headers;
	const token = getToken(authorization);
	try {
		const payload: any = await api({
			baseURL: oauth_url,
			api_path: "/getTokenPayload",
			method: "post",
			request_name: "get token payload",
			data: { token },
		});
		return payload;
	} catch (e) {
		errorHandler(e);
		throw e;
	}
};

export const isValidBearer = (authorization: string): boolean => {
	if (authorization) {
		const is_has_bearer_header = authorization.substring(0, 6) === "Bearer";
		if (is_has_bearer_header) {
			const is_has_bearer_body =
				authorization.split(" ")[1] !== undefined ||
				authorization.split(" ")[1] !== null ||
				authorization.split(" ")[1] !== "";
			if (is_has_bearer_body) {
				const bearer_body = authorization.split(" ")[1];
				const is_valid_bearer_body = bearer_body.length >= 500;
				return is_valid_bearer_body;
			}
		}
	}
	return false;
};

// Auth Middleware
const authMiddleware: (
	req: anyObjectType,
	res: anyObjectType,
	next: () => void
) => Promise<void> = async (req, res, next) => {
	const token = getToken(req.headers.authorization);
	try {
		const result: any = await api({
			baseURL: oauth_url,
			api_path: "/authorization",
			method: "post",
			request_name: "authorization token",
			data: { token },
		});
		if (result?.message === "Valid Token") {
			next();
		} else {
			res.status(401).json({
				message: "Invalid Token",
			});
		}
	} catch (e) {
		errorHandler(e);
		res.status(401).json(e);
	}
};

export default authMiddleware;
