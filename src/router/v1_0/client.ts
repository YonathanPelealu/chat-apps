import * as url_path from "../url_path";
import express from "express";
import controller from "../../controllers/v1_0/";

const client = express.Router()
const {clientController} = controller
const {clientPath} = url_path

client.post(clientPath.register,clientController.registerClient)

export default client
