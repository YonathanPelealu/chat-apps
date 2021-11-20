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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const api_1 = require("./external/api");
const sendNotification = ({ topic, data, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, api_1.api)({
            baseURL: "http://127.0.0.1:3235",
            method: "post",
            request_name: `Push notification for rms ${topic}`,
            api_path: "/notification/rms/event",
            data,
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.sendNotification = sendNotification;
