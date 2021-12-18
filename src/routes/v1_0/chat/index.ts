import express from "express";
import chat from "../chat/chat";
import lastMsg from "../chat/lastMessage";
import room from "../chat/room";

const router = express.Router()

router.use(chat)
router.use(room)
router.use(lastMsg)

export default router