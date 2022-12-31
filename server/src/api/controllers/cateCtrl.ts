import { Request, Response } from "express";
import prisma from "../libs/prisma";

const cateCtrl = {
    allCate: async (req: Request, res: Response) => {
        try {
            const getAll = await prisma.category.findMany();
            res.json(getAll);
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    getById: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const findCate = await prisma.category.findUnique({
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
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    createCate: async (req: Request, res: Response) => {
        const { name, desc } = req.body;
        try {
            //check if input have been created or not
            const find = await prisma.category.findUnique({
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
            const createCate = await prisma.category.create({
                data: {
                    name: String(name),
                    desc: String(desc),
                },
            });
            res.json({ createCate });
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    updateCate: async (req: Request, res: Response) => {
        const id = req.params.id;
        const { name, desc } = req.body;
        try {
            const updateCate = await prisma.category.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name: String(name),
                    desc: String(desc),
                },
            });

            res.json(updateCate);
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    deleteCate: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const deleteCate = await prisma.category.delete({
                where: {
                    id: Number(id),
                },
            });
            res.json({
                msg: "Deleted",
            });
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
};

export default cateCtrl;
