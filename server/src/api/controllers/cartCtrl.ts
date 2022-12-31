import { Request, Response } from "express";
import prisma from "../libs/prisma";

const cartCtrl = {
    addCart: async (req: Request, res: Response) => {
        try {
            const order = req.body.cart;
            const findCart = await prisma.cart.findUnique({
                where: {
                    userId: Number(req.user.id),
                },
            });
            if (!findCart || findCart.status === "PAID") {
                const createCart = await prisma.cart.create({
                    data: {
                        user: {
                            connect: {
                                id: Number(req.user.id),
                            },
                        },
                    },
                });
            } else {
                const updateCart = await prisma.cart.update({
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
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    getCart: async (req: Request, res: Response) => {
        try {
            const getCart = await prisma.cart.findMany({
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
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    deleteItem: async (req: Request, res: Response) => {
        const item = req.body.cart.item;
        try {
            const deleteItem = await prisma.cart.update({
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
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    updateAmount: async (req: Request, res: Response) => {
        const item = req.body.cart.item;
        try {
            const updateQuantity = await prisma.item.update({
                where: {
                    id: Number(item.id),
                },
                data: {
                    quantity: Number(item.quantity),
                    price: Number(item.price),
                },
            });

            res.json(updateQuantity);
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
};

export default cartCtrl;
