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
exports.sendToDynamicScheduler = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const api_1 = require("./external/api");
const sendToDynamicScheduler = ({ topic, data, schedule, }) => __awaiter(void 0, void 0, void 0, function* () {
    const diff_time_in_ms = (0, dayjs_1.default)(schedule).diff((0, dayjs_1.default)());
    try {
        yield (0, api_1.api)({
            baseURL: "http://127.0.0.1:4151",
            method: "post",
            request_name: `sending task ${topic} todo at ${schedule} on dynamic scheduler`,
            api_path: "/pub",
            params: { topic, defer: diff_time_in_ms },
            data,
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.sendToDynamicScheduler = sendToDynamicScheduler;
