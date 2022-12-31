"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const admin_1 = __importDefault(require("../../middleware/admin"));
const paymentCtrl_1 = __importDefault(require("../../controllers/paymentCtrl"));
exports.paymentRouter = (0, express_1.Router)();
exports.paymentRouter
    .route("/")
    .get(auth_1.default, admin_1.default, paymentCtrl_1.default.getPayment)
    .post(auth_1.default, paymentCtrl_1.default.savePayment);
