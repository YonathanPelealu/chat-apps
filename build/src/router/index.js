"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("./auth"));
const v1_0_1 = __importDefault(require("./v1_0"));
// const v2 = require("./v2.0/routes/");
router.use("/auth", auth_1.default);
router.use("/v1.0", authMiddleware_1.default, v1_0_1.default);
exports.default = router;
