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
const general_1 = __importDefault(require("../../constants/general"));
const roomModel_1 = __importDefault(require("../../model/roomModel"));
const roomService_1 = __importDefault(require("../../services/roomService"));
const updateUserInRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { room_id, action, user_id } = req.query;
    try {
        const { message } = yield roomModel_1.default.updateUserInRoom(room_id, action, user_id);
        res.json({
            status: general_1.default.RESPONSE_STATUS_SUCCESS,
            message
        });
    }
    catch (e) {
        res.json({
            status: general_1.default.RESPONSE_STATUS_FAILED,
            message: e.toString()
        });
    }
});
const getRoomLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, client_id } = req.query;
    try {
        const result = yield roomModel_1.default.getRoomLists(user_id, client_id);
        res.json(result);
    }
    catch (e) {
        res.json({
            status: general_1.default.RESPONSE_STATUS_FAILED,
            message: e.toString(e)
        });
    }
});
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { client_id } = req.query;
    try {
        const data = Object.assign({}, req.body);
        const { message } = yield roomService_1.default.createRoom(client_id, data);
        res.json({
            status: general_1.default.RESPONSE_STATUS_SUCCESS,
            message
        });
    }
    catch (e) {
        res.json({
            status: general_1.default.RESPONSE_STATUS_FAILED,
            message: e.toString()
        });
    }
});
exports.default = {
    updateUserInRoom,
    getRoomLists,
    createRoom
};
