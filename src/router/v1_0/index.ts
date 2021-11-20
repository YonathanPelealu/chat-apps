import express from "express";
import chat from "./chat";

const router = express.Router()

router.use(chat)
export default router