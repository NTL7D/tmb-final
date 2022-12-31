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
const prisma_1 = __importDefault(require("../libs/prisma"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET,
});
const uploadCtrl = {
    uploadImg: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const img = req.file;
        try {
            if (!img) {
                return res.status(400).json("No file were uploaded");
            }
            let uploadedFile;
            try {
                uploadedFile = yield cloudinary_1.v2.uploader.upload(img.path, {
                    folder: "upload",
                    resource_type: "auto",
                });
                yield fs_extra_1.default.unlink(path_1.default.resolve(img.path));
            }
            catch (err) {
                res.status(500).json({
                    msg: err.message,
                });
            }
            const { public_id, secure_url, bytes, format } = uploadedFile;
            const upload = yield prisma_1.default.image.create({
                data: {
                    publicId: String(public_id),
                    url: String(secure_url),
                    name: String(img.filename),
                    size: Number(bytes),
                    format: String(format),
                },
            });
            res.json({ upload });
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    deleteImg: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            //find image by id
            const find = yield prisma_1.default.image.findUnique({
                where: {
                    id: Number(id),
                },
            });
            let deleteImg;
            try {
                deleteImg = yield cloudinary_1.v2.uploader.destroy(find.publicId);
            }
            catch (err) {
                res.status(500).json({
                    msg: err.message,
                });
            }
            const deleteImg1 = yield prisma_1.default.image.delete({
                where: {
                    id: Number(id),
                },
            });
            res.json("deleted");
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
};
exports.default = uploadCtrl;
