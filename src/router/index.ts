import express from "express";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();

import auth from "./auth";
import v1_0 from "./v1_0";

// const v2 = require("./v2.0/routes/");

router.use("/auth", auth);
router.use("/v1.0", authMiddleware, v1_0);

export default router;
