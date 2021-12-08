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

// _SocketServer.of("/kriya").on("connection", () => {
// 	console.log("connect from namespace");
// });

// if (req.headers["client-id"] === "kriya") {
// 	if (socketNS["kriya"].listenerCount("connection") < 1) {
// 		socketNS["kriya"].on("connection", (socket) => {
// 			socket.on("join", (room_id) => {
// 				socket.join(room_id);
// 				console.log(
// 					`client socket_id: ${socket.id} joining room: ${room_id}`
// 				);
// 			});
// 			socket.on("leave", (room_id) => {
// 				socket.leave(room_id);
// 				console.log(
// 					`client socket_id: ${socket.id} leaving room: ${room_id}`
// 				);
// 			});
// 			socket.on("disconnect", () => {
// 				console.log("client disconected", socket.id);
// 			});
// 		});
// 	}
// }

// _SocketServer.on("connection", (socket) => {
// 	console.log("connect from init server");

// 	_SocketServer.of("/kriya").on("connection", () => {
// 		console.log("connect from namespace");
// 	});

// 	socket.on("namespace", (namespace) => {
// 		console.log("connect from emit namespace", namespace);

// 		if (namespace === "/kriya") {
// 			_SocketServer.of("/kriya");
// 		}
// 	});

// 	_SocketServer.on("namespace", (namespace) => {
// 		console.log("connect from emit namespace socketServer", namespace);

// 		if (namespace === "/kriya") {
// 			_SocketServer.of("/kriya");
// 		}
// 	});
// });

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
