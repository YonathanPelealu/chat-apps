import express from "express";
import chat from "./chat";
import room from "./room";

const router = express.Router()

router.use(chat)
router.use(room)

export default router