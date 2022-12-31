"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = require("express");
const uploadCtrl_1 = __importDefault(require("../../controllers/uploadCtrl"));
const multer_1 = require("../../libs/multer");
const auth_1 = __importDefault(require("../../middleware/auth"));
const admin_1 = __importDefault(require("../../middleware/admin"));
exports.uploadRouter = (0, express_1.Router)();
exports.uploadRouter.post("/", auth_1.default, admin_1.default, multer_1.upload.single("image"), uploadCtrl_1.default.uploadImg);
exports.uploadRouter.delete("/:id", auth_1.default, admin_1.default, uploadCtrl_1.default.deleteImg);
