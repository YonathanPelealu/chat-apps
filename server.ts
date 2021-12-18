import express from 'express';
import cors from 'cors';
import dotEnv from './config';
import http from "http";
import { Server } from "socket.io";
import { SocketInit } from "./src/connections/socket";
import registerController from './src/controller/v1_0/proxy/registerController';
import multer from "./src/middleware/multer";
dotEnv()
const port = process.env.PORT || 9000
const app = express()
// allowing CORS
app.use(cors());
//get request parameter from body post
app.use(express.json());
//get request parameter from url
app.use(express.urlencoded({ extended: true }));
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
//register route
app.post("/register",multer.filterFile,registerController.register)
console.log(`server run on ${process.env.NODE_ENV} mode on port ${port}`);