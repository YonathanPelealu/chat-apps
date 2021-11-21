import * as url_path from "../url_path";
import express from "express";
import controller from "../../controllers/v1_0/";

const room = express.Router()

const { roomPath } = url_path;
const {roomController} = controller;

room.put(roomPath.updateUser,roomController.updateUserInRoom);
room.post(roomPath.createRoom,roomController.createRoom);
room.get(roomPath.getRoomLists,roomController.getRoomLists);

export default room;
