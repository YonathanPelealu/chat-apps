import express from "express";
import chat from "./chat";
import client from "./client";
import room from "./room";

const router = express.Router()

router.use(chat)
router.use(client)
router.use(room)

export default router