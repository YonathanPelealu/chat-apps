import express from "express";
import chat from "./chat";
import lastMsg from "./lastMessage";
import room from "./room";

const router = express.Router()

router.use(chat)
router.use(room)
router.use(lastMsg)

export default router