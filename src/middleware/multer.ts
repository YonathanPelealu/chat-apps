import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import constant from "../constants/general";

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "./static/uploads/"),
	filename: (req, file, cb) => {
		const file_name = file.originalname;
		const extension = path.extname(file_name);
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, `${uniqueSuffix}${extension}`);
	},
});

const uploadFile = multer({
	storage: storage,
	limits: { fileSize: 5e6 }, // 5 mb
	fileFilter: function (req, file, callback) {
		fileCheck(file, callback);
	},
}).single("file");

const uploadMultipleFile = multer({
	storage: storage,
	limits: {
		fileSize: 5e6,
		files: 5,
	},
	fileFilter: function (req, file, cb) {
		fileCheck(file, cb);
	},
}).array("files");

function fileCheck(file: any, callback: any) {
	const mimeTypeFile = /jpg|jpeg|png|sheet|ms-excel|word|pdf/;
	const originalFile = /jpg|jpeg|png|xlsx|xls|docx|pdf/;

	const mimetype = mimeTypeFile.test(file.mimetype);
	const extName = originalFile.test(
		path.extname(file.originalname).toLowerCase()
	);
	if (mimetype && extName) {
		return callback(null, true);
	} else {
		return callback("jpg|jpeg|png|xlsx|xls|docx|pdf");
	}
}

function filterFile(req: Request, res: Response, next: NextFunction): any {
	uploadFile(req, res, function (err: any) {
		if (err) {
			return res.json({
				status: constant.RESPONSE_STATUS_FAILED,
				message: err.message,
			});
		} else {
			next();
		}
	});
}

function filterMultipleFile(
	req: Request,
	res: Response,
	next: NextFunction
): any {
	uploadMultipleFile(req, res, function (err: any) {
		if (err) {
			return res.json({
				status: constant.RESPONSE_STATUS_FAILED,
				message: err.message,
			});
		} else {
			next();
		}
	});
}

const uploadExcel = multer({
	storage: storage,
	limits: { fileSize: 1e8 }, //100mB
	fileFilter: function (req, file, callbck) {
		fileExcel(file, callbck);
	},
}).single("file");

function fileExcel(file: any, callbck: any) {
	const typeFile = /xlsx|xls|sheet|ms-excel/;
	// console.log(file);
	const extName = typeFile.test(path.extname(file.originalname).toLowerCase());
	const mimetype = typeFile.test(file.mimetype);
	if (mimetype && extName) {
		return callbck(null, true);
	} else {
		return callbck("Upload excel file only", false);
	}
}

function filterExcel(req: Request, res: Response, next: NextFunction): any {
	uploadExcel(req, res, function (err: any) {
		if (err) {
			return res.json({
				status: constant.RESPONSE_STATUS_FAILED,
				message: err,
			});
		}
		if (req.file === undefined) {
			return res.send("Error: no file selected");
		} else {
			next();
		}
	});
}

export default {
	filterFile,
	filterMultipleFile,
	filterExcel,
};
