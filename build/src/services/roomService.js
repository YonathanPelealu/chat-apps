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
const updateUserInRoom = (room_id, new_user_lists) => __awaiter(void 0, void 0, void 0, function* () {
    let message = "";
    try {
        const query = `UPDATE room SET users_ids = $1 where room_id = $2`;
        const params = [new_user_lists, room_id];
        const result = yield postgre_1.default.query(query, params);
        result ? message = 'success add new client' : message = 'failed add new client';
        return { message };
    }
    catch (e) {
        throw new Error(e);
    }
});
/*
  this below function is used on room model "update user in room"
  to get latest user in room, before updating user lists
*/
const getCurrentUserInRoom = (room_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM room WHERE room.id = $1`;
        const params = [room_id];
        const { rows } = yield postgre_1.default.query(query, params);
        return rows;
    }
    catch (e) {
        throw new Error(e);
    }
});
const getRoomLists = (user_id, client_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM room WHERE room.clients_id = $1 AND user_id = any(room.data->>"user_ids")`;
        const params = [client_id, user_id];
        const { rows } = yield postgre_1.default.query(query, params);
        return rows;
    }
    catch (e) {
        throw new Error(e);
    }
});
const createRoom = (client_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let message = "";
        const query = `INSERT INTO room (client_id,data,is_deleted) VALUES ($1,$2,$3)`;
        const params = [client_id, data, false];
        const result = yield postgre_1.default.query(query, params);
        result ? message = 'success add new room' : message = 'failed add new room';
        return { message };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.default = {
    updateUserInRoom,
    getCurrentUserInRoom,
    getRoomLists,
    createRoom
};
