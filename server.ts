import express from 'express';
import cors from 'cors';
import dotEnv from './config';
import http from "http";
import { Server } from "socket.io";
import { SocketInit } from "./src/connections/socket";

dotEnv()
const port = process.env.PORT || 9000
const app = express()
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

console.log(`server run on ${process.env.NODE_ENV} mode on port ${port}`);
