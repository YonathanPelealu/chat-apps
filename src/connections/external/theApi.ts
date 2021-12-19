import axios from "axios";
import { anyObjectType } from "../../interfaces/general_interface";
import FormData from "form-data";
const forms = new FormData;
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
    headers?:anyObjectType
};

export const api = async ({
    method,
    request_name,
    api_path,
    data,
    params,
    baseURL,
    headers
}: apiConfigType):Promise<Result> => {

    try {
        console.log('service')
        console.log(data)
        const instance = axios.create({
            baseURL: `${base_url}`,
            timeout: 1000,
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                ...forms.getHeaders()    
            },
            data
        })
		await instance({
            baseURL,
            method,
            url: api_path,
            data,
            params,
        }).then((res) => {
			result_data = res.data;
            console.log(res)
		})
        return result_data;
    } catch (e) {
        console.log(e.response.data.detail)
		throw `request ${request_name} error ${e.response.status}`;
        
    }
};

// var request = require('request');
// var fs = require('fs');
// var options = {
//   'method': 'POST',
//   'url': 'localhost:9000/register',
//   'headers': {
//   },
//   formData: {
//     'username': 'rimuru@tempest.com',
//     'password': '123456789',
//     'first_name': 'rimuru',
//     'telephone': '+628123456788',
//     'file': {
//       'value': fs.createReadStream('/home/qi/prj/chat-apps/static/uploads/1639839715611-774196236.jpeg'),
//       'options': {
//         'filename': '1639839715611-774196236.jpeg',
//         'contentType': null
//       }
//     },
//     'address': 'tempest',
//     'city': 'jura',
//     'province': 'central',
//     'country': 'great jura',
//     'last_name': 'tempest'
//   }
// };
// export default request(options, function (error:any, response:any) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });
