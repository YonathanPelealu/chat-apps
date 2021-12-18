import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "./static/uploads/images/"),
	filename: (req, file, cb) => {
		const file_name = file.originalname;
		const extension = path.extname(file_name);
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, `${uniqueSuffix}${extension}`);
	},
});

const upload = multer({
	storage: storage,
});

const uploadExcel = multer({
	storage: storage,
	limits: { fileSize: 1000000000 },
	fileFilter: function (req, file, callbck) {
		fileCheck(file, callbck);
	},
}).single("file");

function fileCheck(file: any, callbck: any) {
	const typeFile = /jpeg|jpg|png|gif/;
	const extName = typeFile.test(path.extname(file.originalname).toLowerCase());
	// console.log(extName);
	const mimetype = typeFile.test(file.mimetype);
	// console.log(mimetype);
	if (mimetype && extName) {
		return callbck(null, true);
	} else {
		return callbck(null, false);
	}
}

function filterExcel(req: Request, res: Response, next: NextFunction) {
	uploadExcel(req, res, function (err: any) {
		if (err) {
			res.send("Error: File too large");
			// console.log(err);
		} else {
			if (req.file === undefined) {
				res.send("Error: no file selected");
			} else {
				next();
			}
		}
	});
}

// allow upload formdata from parent /api max 5 images

export default {
	upload,
	filterExcel,
};
