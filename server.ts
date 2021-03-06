import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import api from "./src/router";
import dotEnv from "./config";
import authMiddleware from "./src/middleware/authMiddleware";
import appsVersionController from "./src/controllers/appsVersionController";

import { SocketInit, socketNS } from "./src/connections/socket";
import { migrateServices } from "./src/migrator";
import clientController from "./src/controllers/v1_0/clientController";

dotEnv();
const port = process.env.PORT || 9000;
const app = express();
const socketServer = http.createServer(app);
socketServer.listen(port);

const _SocketServer = new Server(socketServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

SocketInit(_SocketServer);

socketServer.on("connection", () => {
	console.log("connect nih");
});

// allowing CORS
app.use(cors());
//get request parameter from url
app.use(express.urlencoded({ extended: true }));
//get request parameter from body post
app.use(express.json());
//get request parameter from multipart/form-data
app.use("/migrate", async (req, res) => {
	try {
		await migrateServices();
		res.json("migration done");
	} catch (e) {
		console.log(e);
	}
});
app.use("/register", clientController.registerClient);

app.use("/api", authMiddleware, api);

app.use("/static", express.static(process.cwd() + "/static"));
app.get("/download", function (req, res) {
	const file = `${process.cwd()}/static/downloads/template.xlsx`;
	res.download(file); // Set disposition and send it.
});

app.get("/apps_version", appsVersionController.getAppsVersion);

if (process.env.NODE_ENV === "development") {
	app.get("/download", function (req, res) {
		const file = `${__dirname}/static/downloads/files/template.xlsx`;
		res.download(file); // Set disposition and send it.
	});
}

// get root directory
export const rootPath = __dirname;

console.log(`server run on ${process.env.NODE_ENV} mode on port ${port}`);

/**
 below function only need to be activated once for migrating into database
*/
// (async () => await migrateServices())()
