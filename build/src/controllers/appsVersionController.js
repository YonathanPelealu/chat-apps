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
const general_1 = __importDefault(require("../constants/general"));
const postgre_1 = __importDefault(require("../connections/db/postgre"));
const getAppsVersion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postgre_1.default.query("SELECT data FROM public.apps_version ORDER BY updated_at DESC LIMIT 1", []);
        res.json(result.rows[0].data);
    }
    catch (e) {
        res.json({
            status: general_1.default.RESPONSE_STATUS_FAILED,
            message: e,
        });
    }
});
exports.default = {
    getAppsVersion,
};
