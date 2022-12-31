"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const userCtrl_1 = __importDefault(require("../../controllers/userCtrl"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/signup", userCtrl_1.default.signup);
exports.userRouter.post("/signin", userCtrl_1.default.signin);
exports.userRouter.get("/signout", userCtrl_1.default.signout);
exports.userRouter.get("/info", auth_1.default, userCtrl_1.default.getInfo);
exports.userRouter.get("/refreshtoken", userCtrl_1.default.refreshToken);
