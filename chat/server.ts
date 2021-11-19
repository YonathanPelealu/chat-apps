import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import api from "./src/router";
import oauth from "./src/router/auth";
import dotEnv from "./config";
import authMiddleware from "./src/middleware/authMiddleware";
import appsVersionController from "./src/controllers/appsVersionController";

import { SocketInit } from "./src/connections/socket";

dotEnv();
const port = process.env.PORT || 9000;
const app = express();
const socketServer = http.createServer(app);
socketServer.listen(port);

SocketInit(
	new Server(socketServer, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	})
);

// allowing CORS
app.use(cors());
//get request parameter from url
app.use(express.urlencoded({ extended: true }));
//get request parameter from body post
app.use(express.json());
//get request parameter from multipart/form-data

app.use("/api", authMiddleware, api);

app.use("/oauth", oauth);

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

// process.on("uncaughtException", (e) => {
// 	errorHandler(e);
// process.exit(1);
// });

console.log(`server run on ${process.env.NODE_ENV} mode on port ${port}`);
