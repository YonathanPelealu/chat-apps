"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
let configPath = "";
if (process.env.NODE_ENV === "development")
    configPath = "./development.env";
if (process.env.NODE_ENV === "staging")
    configPath = "./staging.env";
if (process.env.NODE_ENV === "production")
    configPath = "./production.env";
if (process.env.NODE_ENV === "local")
    configPath = "./local.env";
const dotenvInit = () => {
    dotenv_1.default.config({
        path: configPath,
    });
};
exports.default = dotenvInit;
