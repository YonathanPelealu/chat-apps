"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const axios_1 = __importDefault(require("axios"));
const base_url = "https://api.atto.id/";
let result_data;
const api = ({ method, request_name, api_path, data, params, baseURL, }) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = axios_1.default.create({
        baseURL: `${base_url}`,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ClientID: `dsoaihjewiqhdshaojnxcdsadsa`,
        },
    });
    yield instance({
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
});
exports.api = api;
