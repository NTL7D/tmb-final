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
const paymentCtrl = {
    getPayment: (req, res) => __awaiter(void 0, void 0, void 0, function* () { }),
    savePayment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { cart, paymentId, address, firstname, lastname, total } = req.body;
            const findUser = yield prisma_1.default.user.findUnique({
                where: {
                    id: Number(req.user.id),
                },
            });
            const createPayment = yield prisma_1.default.payment.create({
                data: {
                    paymentId: String(paymentId),
                    first_name: String(firstname),
                    last_name: String(lastname),
                    address: String(address),
                    cart: {
                        connect: {
                            id: Number(cart.cart.id),
                        },
                    },
                    user: {
                        connect: {
                            id: Number(req.user.id),
                        },
                    },
                    total: Number(total),
                },
            });
            if (!findUser) {
                res.status(400).json({
                    msg: "User not found",
                });
            }
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
};
exports.default = paymentCtrl;
