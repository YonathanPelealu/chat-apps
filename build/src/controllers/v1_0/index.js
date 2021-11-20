"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clientController_1 = __importDefault(require("./clientController"));
const messageController_1 = __importDefault(require("./messageController"));
const roomController_1 = __importDefault(require("./roomController"));
exports.default = {
    messageController: messageController_1.default,
    clientController: clientController_1.default,
    roomController: roomController_1.default
};
