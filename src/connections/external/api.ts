import { anyObjectType } from "../../interfaces/general_interface";
import axios from "axios";

export interface Results {
	results: anyObjectType[];
}

const base_url = "https://api.atto.id/";

let result_data: Results;

type apiConfigType = {
	method: "post" | "get" | "delete" | "put";
	request_name: string;
	api_path: string;
	data?: Record<string, any>;
	params?: Record<string, any>;
	baseURL?: string;
};

export const api = async ({
	method,
	request_name,
	api_path,
	data,
	params,
	baseURL,
}: apiConfigType): Promise<Results> => {
	const instance = axios.create({
		baseURL: `${base_url}`,
		timeout: 10000,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			ClientID: `dsoaihjewiqhdshaojnxcdsadsa`,
		},
	});
	await instance({
		baseURL,
		method,
		url: api_path,
		data,
		params,
	})
		.then((res) => {
			result_data = res.data;
		})
		.catch((err) => {
			console.log(err.message);
			throw `request ${request_name} error ${err.code}`;
		});

	return result_data;
};
