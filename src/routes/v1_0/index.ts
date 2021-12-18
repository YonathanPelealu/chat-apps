import express from "express";
const router = express.Router();

import chat from "./chat";
import proxy from "./proxy";

// const v2 = require("./v2.0/routes/");

router.use("/chat",chat);
router.use("/proxy",proxy);


export default router;
