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
const generateSecret_1 = require("../controllers/helper/generateSecret");
const clientService_1 = __importDefault(require("../services/clientService"));
const registerClient = (name, chat_type, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client_id = `${name}-${(0, generateSecret_1.keyGenerator)(15)}`;
        const client_key = `${name}-${(0, generateSecret_1.keyGenerator)(15)}-PUB`;
        const client_secret = `${name}-${(0, generateSecret_1.keyGenerator)(15)}-PVT`;
        let data = {
            name,
            chat_type,
            client_id,
            client_key,
            client_secret,
            description
        };
        return yield clientService_1.default.registerClient(data);
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.default = {
    registerClient
};
