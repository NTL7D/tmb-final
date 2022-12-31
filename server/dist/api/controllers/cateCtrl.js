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
const cateCtrl = {
    allCate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getAll = yield prisma_1.default.category.findMany();
            res.json(getAll);
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    getById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const findCate = yield prisma_1.default.category.findUnique({
                where: {
                    id: Number(id),
                },
            });
            // if not found
            if (!findCate) {
                return res.status(404).json({
                    msg: "Category not found",
                });
            }
            res.json(findCate);
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    createCate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, desc } = req.body;
        try {
            //check if input have been created or not
            const find = yield prisma_1.default.category.findUnique({
                where: {
                    name: String(name),
                },
            });
            if (find) {
                return res.status(400).json({
                    msg: "Category have been created",
                });
            }
            //create new category
            const createCate = yield prisma_1.default.category.create({
                data: {
                    name: String(name),
                    desc: String(desc),
                },
            });
            res.json({ createCate });
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    updateCate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const { name, desc } = req.body;
        try {
            const updateCate = yield prisma_1.default.category.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name: String(name),
                    desc: String(desc),
                },
            });
            res.json(updateCate);
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    deleteCate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const deleteCate = yield prisma_1.default.category.delete({
                where: {
                    id: Number(id),
                },
            });
            res.json({
                msg: "Deleted",
            });
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
};
exports.default = cateCtrl;
