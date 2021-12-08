import * as url_path from "../url_path";
import express from "express";
import controller from "../../controllers/v1_0/";
import multer from "../../middleware/multer";
import { socketMiddleware } from "../../middleware/socket";

const chat = express.Router();

const { chatPath } = url_path;
const { messageController } = controller;

chat.post(
	chatPath.sendMessage,
	multer.filterFile,
	messageController.addMessage
);
chat.get(
	chatPath.getChat,
	socketMiddleware,
	messageController.getMessageOnRoom
);

export default chat;
