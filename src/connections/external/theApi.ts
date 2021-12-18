import axios from "axios";
import { anyObjectType } from "../../interfaces/general_interface";
import FormData from "form-data";

const form = new FormData;
const base_url = "http://13.212.226.116:8000/api";

export interface Result {
    results: anyObjectType[]
}

let result_data: Result;

type apiConfigType = {
    method: "post" | "get" | "delete" | "put";
    request_name : string;
    api_path: string;
    data? : Record<string,any>;
    params?: Record<string,any>;
    baseURL?:string;
};

export const api = async ({
    method,
    request_name,
    api_path,
    data,
    params,
    baseURL
}: apiConfigType):Promise<Result> => {
    const instance = axios.create({
        baseURL: `${base_url}`,
        timeout: 1000,
        headers: {
            ...form.getHeaders()    
        }
    })
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