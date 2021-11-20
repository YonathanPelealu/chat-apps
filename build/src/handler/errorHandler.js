"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbErrorHandler = exports.errorHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const logFile = fs_1.default.createWriteStream(__dirname + "/../../error.log", {
    flags: "a",
});
const errorHandler = (e) => {
    const timestamp = new Date();
    const { name, stack, message } = e;
    logFile.write(util_1.default.format(`---${timestamp}---\nName: ${name}, Message: ${message}, \nStack: ${stack}\n\n`));
    console.log(e);
};
exports.errorHandler = errorHandler;
const dbErrorHandler = (e) => {
    const timestamp = new Date();
    const { length, name, severity, code, detail, hint, position, internalPosition, internalQuery, where, schema, table, column, dataType, constraint, file, line, routine, } = e;
    logFile.write(util_1.default.format(`---${timestamp}---\nName: ${name}, Code: ${code}, Detail : ${detail}, Where : ${where}, Table : ${table}, Column : ${column}, Constraint : ${constraint}}`) + "\n");
    console.log(e);
    // const logStdout = process.stdout; // print to console
    // logStdout.write(util.format(e) + "\n");
};
exports.dbErrorHandler = dbErrorHandler;
