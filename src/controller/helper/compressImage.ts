import fs from "fs";
import { compresFunc } from "../../interfaces/general_interface";
const webp = require("webp-converter");
webp.grant_permission();
const convertToWebp: compresFunc = (inputImage, outputImage) => {
	const dot = ".";
	const indexOfDot = outputImage.indexOf(dot);
	const newOutput = outputImage.substring(0, indexOfDot) + ".webp";
	const result = webp.cwebp(
		inputImage,
		newOutput,
		"-q 0",
		(webp.logging = "-v")
	);
	result.then(() => {
		fs.unlinkSync(inputImage);
	});
	return newOutput;
};

export default {
	convertToWebp,
};
