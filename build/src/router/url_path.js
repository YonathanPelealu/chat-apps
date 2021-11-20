"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientPath = exports.roomPath = exports.chatPath = void 0;
exports.chatPath = {
    sendMessage: "/chat/send",
    getChat: "/chat/lists"
};
exports.roomPath = {
    createRoom: "/room/create",
    getRoomLists: "/room/lists",
    updateUser: "/room/update-user"
};
exports.clientPath = {
    register: "/client/register"
};
