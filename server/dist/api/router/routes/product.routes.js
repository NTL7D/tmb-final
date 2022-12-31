"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const admin_1 = __importDefault(require("../../middleware/admin"));
const productCtrl_1 = __importDefault(require("../../controllers/productCtrl"));
exports.productRouter = (0, express_1.Router)();
exports.productRouter
    .route("/")
    .get(productCtrl_1.default.getProduct)
    .post(auth_1.default, admin_1.default, productCtrl_1.default.createProduct);
exports.productRouter
    .route("/:id")
    .get(productCtrl_1.default.getById)
    .put(auth_1.default, admin_1.default, productCtrl_1.default.updateProduct)
    .delete(auth_1.default, admin_1.default, productCtrl_1.default.deleteProduct);
