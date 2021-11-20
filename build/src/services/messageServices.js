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
const postgre_1 = __importDefault(require("../connections/db/postgre"));
const addMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let message = '';
    try {
        const { room_id, sent_by, path, text, is_deleted } = data;
        const query = `INSERT INTO messages (room_id,sent_by,path,text,is_deleted) VALUES ($1,$2,$3,$4,$5)`;
        const params = [room_id, sent_by, path, text, is_deleted];
        const res = yield postgre_1.default.query(query, params);
        res ? message = 'success send message' : message = 'Failed send message';
        return { message };
    }
    catch (e) {
        throw new Error(e);
    }
});
const getMessageOnRoom = (room_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM messages WHERE message.room_id = $1 AND messages.is_active = true`;
        const params = [room_id];
        const { rows } = yield postgre_1.default.query(query, params);
        return rows;
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.default = {
    addMessage,
    getMessageOnRoom
};
