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
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const errorHandler_1 = require("../../handler/errorHandler");
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    let password_hashed = "";
    const salt = process.env.SALT;
    const saltedPassword = `${salt}${password}`;
    try {
        password_hashed = (0, crypto_1.createHash)("sha256").update(saltedPassword).digest("hex");
        return password_hashed;
    }
    catch (e) {
        (0, errorHandler_1.errorHandler)(e);
        throw new Error(e);
    }
});
exports.default = hashPassword;
