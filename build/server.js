"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootPath = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./src/router"));
const auth_1 = __importDefault(require("./src/router/auth"));
const config_1 = __importDefault(require("./config"));
const authMiddleware_1 = __importDefault(require("./src/middleware/authMiddleware"));
const appsVersionController_1 = __importDefault(require("./src/controllers/appsVersionController"));
const socket_1 = require("./src/connections/socket");
const migrator_1 = require("./src/migrator");
(0, config_1.default)();
const port = process.env.PORT || 9000;
const app = (0, express_1.default)();
const socketServer = http_1.default.createServer(app);
socketServer.listen(port);
(0, socket_1.SocketInit)(new socket_io_1.Server(socketServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
}));
// allowing CORS
app.use((0, cors_1.default)());
//get request parameter from url
app.use(express_1.default.urlencoded({ extended: true }));
//get request parameter from body post
app.use(express_1.default.json());
//get request parameter from multipart/form-data
app.use("/migrate", migrator_1.migrateServices);
app.use("/api", authMiddleware_1.default, router_1.default);
app.use("/oauth", auth_1.default);
app.use("/static", express_1.default.static(process.cwd() + "/static"));
app.get("/download", function (req, res) {
    const file = `${process.cwd()}/static/downloads/template.xlsx`;
    res.download(file); // Set disposition and send it.
});
app.get("/apps_version", appsVersionController_1.default.getAppsVersion);
if (process.env.NODE_ENV === "development") {
    app.get("/download", function (req, res) {
        const file = `${__dirname}/static/downloads/files/template.xlsx`;
        res.download(file); // Set disposition and send it.
    });
}
// get root directory
exports.rootPath = __dirname;
// process.on("uncaughtException", (e) => {
// 	errorHandler(e);
// process.exit(1);
// });
console.log(`server run on ${process.env.NODE_ENV} mode on port ${port}`);
/**
 below function only need to be activated once for migrating into database
*/
(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, migrator_1.migrateServices)(); }))();
