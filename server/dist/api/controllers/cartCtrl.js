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
const cartCtrl = {
    addCart: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = req.body.cart;
            const findCart = yield prisma_1.default.cart.findUnique({
                where: {
                    userId: Number(req.user.id),
                },
            });
            if (!findCart || findCart.status === "PAID") {
                const createCart = yield prisma_1.default.cart.create({
                    data: {
                        user: {
                            connect: {
                                id: Number(req.user.id),
                            },
                        },
                    },
                });
            }
            else {
                const updateCart = yield prisma_1.default.cart.update({
                    where: {
                        id: Number(findCart.id),
                    },
                    data: {
                        item: {
                            create: [
                                {
                                    product: {
                                        connect: {
                                            name: String(order.name),
                                        },
                                    },
                                    quantity: parseInt(order.quantity),
                                    price: parseInt(order.price),
                                },
                            ],
                        },
                    },
                });
                res.json("Thêm thành công");
            }
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    getCart: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getCart = yield prisma_1.default.cart.findMany({
                where: {
                    userId: Number(req.user.id),
                    status: "PENDING",
                },
                include: {
                    item: {
                        select: {
                            product: {
                                select: {
                                    name: true,
                                    desc: true,
                                    image: {
                                        select: {
                                            url: true,
                                        },
                                    },
                                },
                            },
                            price: true,
                            quantity: true,
                        },
                    },
                },
            });
            res.json(getCart);
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    deleteItem: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const item = req.body.cart.item;
        try {
            const deleteItem = yield prisma_1.default.cart.update({
                where: {
                    id: Number(req.user.id),
                },
                data: {
                    item: {
                        delete: {
                            id: Number(item.id),
                        },
                    },
                },
            });
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    updateAmount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const item = req.body.cart.item;
        try {
            const updateQuantity = yield prisma_1.default.item.update({
                where: {
                    id: Number(item.id),
                },
                data: {
                    quantity: Number(item.quantity),
                    price: Number(item.price),
                },
            });
            res.json(updateQuantity);
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
};
exports.default = cartCtrl;
