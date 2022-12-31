import { Request, Response, NextFunction } from "express";
import prisma from "../libs/prisma";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.user.id),
            },
        });
        if (user!.role === "USER") {
            return res.status(400).json({
                msg: "Access denied",
            });
        }
        next();
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
        });
    }
};

export default adminAuth;
