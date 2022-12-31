import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(400).json({
                msg: "Invalid authenication",
            });
        }
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string,
            (err: any, user: any) => {
                if (err) {
                    return res.status(400).json({
                        msg: "Invalid Authentication",
                    });
                }
                req.user = user;
                next();
            }
        );
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
        });
    }
};

export default auth;
