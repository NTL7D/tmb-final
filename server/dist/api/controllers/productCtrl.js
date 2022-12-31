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
const productCtrl = {
    getProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, skip, take, orderBy } = req.query;
        try {
            const productName = name
                ? {
                    OR: [
                        {
                            name: { contains: String(name) },
                        },
                    ],
                }
                : {};
            const getProduct = yield prisma_1.default.product.findMany({
                skip: Number(skip) || undefined,
                take: Number(take) || undefined,
                where: Object.assign({}, productName),
                orderBy: {
                    updatedAt: orderBy,
                },
                include: {
                    category: true,
                    image: true,
                },
            });
            res.json(getProduct);
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    getById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const findProduct = yield prisma_1.default.product.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    category: true,
                    image: true,
                },
            });
            res.json(findProduct);
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    createProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, desc, price, category, image } = req.body;
        try {
            if (!image) {
                return res.status(400).json({ msg: "no image uploaded" });
            }
            const find = yield prisma_1.default.product.findUnique({
                where: {
                    name: String(name),
                },
            });
            if (find) {
                return res.status(400).json({
                    msg: "Product have been created",
                });
            }
            const createProduct = yield prisma_1.default.product.create({
                data: {
                    name: String(name),
                    desc: String(desc),
                    price: Number(price),
                    category: {
                        connect: {
                            name: String(category),
                        },
                    },
                    image: {
                        connect: {
                            url: String(image),
                        },
                    },
                },
            });
            res.json({ createProduct });
        }
        catch (err) { }
    }),
    updateProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const { name, desc, price, category, image } = req.body;
        try {
            const updateProduct = yield prisma_1.default.product.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name: String(name),
                    desc: String(desc),
                    price: Number(price),
                    category: {
                        connect: {
                            name: String(category),
                        },
                    },
                    image: {
                        connect: {
                            url: String(image),
                        },
                    },
                },
            });
            res.json({ updateProduct });
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    deleteProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const deleteProduct = yield prisma_1.default.product.delete({
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
exports.default = productCtrl;
