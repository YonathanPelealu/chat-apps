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
const roomService_1 = __importDefault(require("../services/roomService"));
const updateUserInRoom = (room_id, action, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield roomService_1.default.getCurrentUserInRoom(room_id);
        let new_users_lists = data.user_ids;
        action == 'join' ? new_users_lists.push(user_id) : new_users_lists.filter((users) => !new_users_lists.includes(users));
        return yield roomService_1.default.updateUserInRoom(room_id, new_users_lists);
    }
    catch (e) {
        throw new Error(e);
    }
});
const getRoomLists = (user_id, client_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield roomService_1.default.getRoomLists(user_id, client_id);
    }
    catch (e) {
        throw new Error(e);
    }
});
const createRoom = (client_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield roomService_1.default.createRoom(client_id, data);
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.default = {
    updateUserInRoom,
    getRoomLists,
    createRoom
};
