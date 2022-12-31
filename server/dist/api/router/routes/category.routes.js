"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cateRouter = void 0;
const express_1 = require("express");
const cateCtrl_1 = __importDefault(require("../../controllers/cateCtrl"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const admin_1 = __importDefault(require("../../middleware/admin"));
exports.cateRouter = (0, express_1.Router)();
exports.cateRouter
    .route("/")
    .get(cateCtrl_1.default.allCate)
    .post(auth_1.default, admin_1.default, cateCtrl_1.default.createCate);
exports.cateRouter
    .route("/:id")
    .get(cateCtrl_1.default.getById)
    .put(auth_1.default, admin_1.default, cateCtrl_1.default.updateCate)
    .delete(auth_1.default, admin_1.default, cateCtrl_1.default.deleteCate);
