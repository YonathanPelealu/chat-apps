import * as url_path from "../../url_path";
import express from "express";
import controller from "../../../controller/v1_0/chat";

const lastMsg = express.Router();

const {lastMsgPath} = url_path;
const { lastMessageController } = controller;

lastMsg.get(lastMsgPath.get,lastMessageController.getLatestMessageForRoom)

export default lastMsg;
