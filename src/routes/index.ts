import express from "express";
const router = express.Router();

import v1_0 from "./v1_0";

// const v2 = require("./v2.0/routes/");

router.use("/v1.0",v1_0);

export default router;
