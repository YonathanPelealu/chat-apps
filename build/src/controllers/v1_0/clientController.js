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
const clientModel_1 = __importDefault(require("../../model/clientModel"));
const general_1 = __importDefault(require("../../constants/general"));
const registerClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, chat_type, description } = req.body;
    try {
        const { message } = yield clientModel_1.default.registerClient(name, chat_type, description);
    }
    catch (e) {
        res.json({
            status: general_1.default.RESPONSE_STATUS_FAILED,
            message: e.toString()
        });
    }
});
exports.default = {
    registerClient
};
