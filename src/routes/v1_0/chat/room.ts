import * as url_path from "../../url_path";
import express from "express";
import controller from "../../../controller/v1_0/chat";

const room = express.Router();

const { roomPath } = url_path;
const { roomController } = controller;

room.put(roomPath.updateUser, roomController.updateUserInRoom);
room.post(roomPath.createRoom, roomController.createRoom);
room.get(roomPath.getRoomLists, roomController.getRoomLists);
room.get(roomPath.getRoomById, roomController.getRoomById);
room.get(roomPath.getTypeLists, roomController.getRoomTypeLists);

export default room;
