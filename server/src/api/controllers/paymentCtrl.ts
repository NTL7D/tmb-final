import { Request, Response } from "express";
import prisma from "../libs/prisma";

const paymentCtrl = {
    getPayment: async (req: Request, res: Response) => {
        try {
            const getPayment = await prisma.payment.findMany();

            res.json(getPayment);
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    savePayment: async (req: Request, res: Response) => {
        try {
            const { cart, paymentId, address, firstname, lastname, total } =
                req.body;
            const findUser = await prisma.user.findUnique({
                where: {
                    id: Number(req.user.id),
                },
            });

            if (!findUser) {
                res.status(400).json({
                    msg: "User not found",
                });
            }

            const createPayment = await prisma.payment.create({
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
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
};

export default paymentCtrl;
