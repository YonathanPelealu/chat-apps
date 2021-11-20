"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const webp = require("webp-converter");
webp.grant_permission();
const convertToWebp = (inputImage, outputImage) => {
    const dot = ".";
    const indexOfDot = outputImage.indexOf(dot);
    const newOutput = outputImage.substring(0, indexOfDot) + ".webp";
    const result = webp.cwebp(inputImage, newOutput, "-q 0", (webp.logging = "-v"));
    result.then(() => {
        fs_1.default.unlinkSync(inputImage);
    });
    return newOutput;
};
exports.default = {
    convertToWebp,
};
