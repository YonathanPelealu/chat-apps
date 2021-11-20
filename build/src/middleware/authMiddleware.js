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
exports.isValidBearer = exports.getTokenPayloadFromHeaders = exports.getTokenPayload = exports.getToken = exports.generateToken = void 0;
const errorHandler_1 = require("./../handler/errorHandler");
const api_1 = require("../connections/external/api");
const config_1 = __importDefault(require("../../config"));
(0, config_1.default)();
const oauth_url = `http://127.0.0.1:${process.env.PORT_OAUTH}/oauth`;
const generateToken = (phone, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token_object = yield (0, api_1.api)({
            baseURL: oauth_url,
            api_path: "/login",
            method: "post",
            request_name: "login",
            data: { phone, password },
        });
        if (token_object) {
            return token_object;
        }
        else {
            throw "You use wrong phone or password";
        }
    }
    catch (e) {
        (0, errorHandler_1.errorHandler)(e);
        throw e;
    }
});
exports.generateToken = generateToken;
const getToken = (authorization) => {
    const token = authorization.split(" ")[1];
    return token;
};
exports.getToken = getToken;
const getTokenPayload = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield (0, api_1.api)({
            baseURL: oauth_url,
            api_path: "/getTokenPayload",
            method: "post",
            request_name: "get token payload",
            data: { token },
        });
        return payload;
    }
    catch (e) {
        (0, errorHandler_1.errorHandler)(e);
        throw e;
    }
});
exports.getTokenPayload = getTokenPayload;
const getTokenPayloadFromHeaders = (headers) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = headers;
    const token = (0, exports.getToken)(authorization);
    try {
        const payload = yield (0, api_1.api)({
            baseURL: oauth_url,
            api_path: "/getTokenPayload",
            method: "post",
            request_name: "get token payload",
            data: { token },
        });
        return payload;
    }
    catch (e) {
        (0, errorHandler_1.errorHandler)(e);
        throw e;
    }
});
exports.getTokenPayloadFromHeaders = getTokenPayloadFromHeaders;
const isValidBearer = (authorization) => {
    if (authorization) {
        const is_has_bearer_header = authorization.substring(0, 6) === "Bearer";
        if (is_has_bearer_header) {
            const is_has_bearer_body = authorization.split(" ")[1] !== undefined ||
                authorization.split(" ")[1] !== null ||
                authorization.split(" ")[1] !== "";
            if (is_has_bearer_body) {
                const bearer_body = authorization.split(" ")[1];
                const is_valid_bearer_body = bearer_body.length >= 500;
                return is_valid_bearer_body;
            }
        }
    }
    return false;
};
exports.isValidBearer = isValidBearer;
// Auth Middleware
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, exports.getToken)(req.headers.authorization);
    try {
        const result = yield (0, api_1.api)({
            baseURL: oauth_url,
            api_path: "/authorization",
            method: "post",
            request_name: "authorization token",
            data: { token },
        });
        if ((result === null || result === void 0 ? void 0 : result.message) === "Valid Token") {
            next();
        }
        else {
            res.status(401).json({
                message: "Invalid Token",
            });
        }
    }
    catch (e) {
        (0, errorHandler_1.errorHandler)(e);
        res.status(401).json(e);
    }
});
exports.default = authMiddleware;
