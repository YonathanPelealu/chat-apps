"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, "./static/uploads/images/"),
    filename: (req, file, cb) => {
        const file_name = file.originalname;
        const extension = path_1.default.extname(file_name);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extension}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
});
const uploadExcel = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1000000000 },
    fileFilter: function (req, file, callbck) {
        fileCheck(file, callbck);
    },
}).single("file");
function fileCheck(file, callbck) {
    const typeFile = /jpeg|jpg|png|gif/;
    const extName = typeFile.test(path_1.default.extname(file.originalname).toLowerCase());
    // console.log(extName);
    const mimetype = typeFile.test(file.mimetype);
    // console.log(mimetype);
    if (mimetype && extName) {
        return callbck(null, true);
    }
    else {
        return callbck(null, false);
    }
}
function filterExcel(req, res, next) {
    uploadExcel(req, res, function (err) {
        if (err) {
            res.send("Error: File too large");
            // console.log(err);
        }
        else {
            if (req.file === undefined) {
                res.send("Error: no file selected");
            }
            else {
                next();
            }
        }
    });
}
// allow upload formdata from parent /api max 5 images
exports.default = {
    upload,
    filterExcel,
};
