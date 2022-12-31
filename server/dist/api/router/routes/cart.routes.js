"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const cartCtrl_1 = __importDefault(require("../../controllers/cartCtrl"));
const auth_1 = __importDefault(require("./../../middleware/auth"));
exports.cartRouter = (0, express_1.Router)();
exports.cartRouter.route("/").post(auth_1.default, cartCtrl_1.default.addCart);
exports.cartRouter.route("/:id").get(auth_1.default, cartCtrl_1.default.getCart);
exports.cartRouter.route("/item").put(cartCtrl_1.default.updateAmount);
