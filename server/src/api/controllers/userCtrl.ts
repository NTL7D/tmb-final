import { Request, Response } from "express";
import prisma from "../libs/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userCtrl = {
    signup: async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        try {
            // check duplicate email
            const findUser = await prisma.user.findUnique({
                where: {
                    email: String(email),
                },
            });
            if (findUser) {
                return res.status(400).json({
                    msg: "email have been registered",
                });
            }
            //check password length
            if (String(password).length < 6) {
                return res.status(400).json({
                    msg: "Password must be at least 6 characters",
                });
            }
            //password encryption
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(String(password), salt);
            //register
            const newUser = await prisma.user.create({
                data: {
                    name: String(name),
                    email: String(email),
                    password: String(hashPass),
                },
            });
            //create access token and refresh token after registration
            const accesstoken = createAccessToken({ id: newUser.id });
            const refreshtoken = createRefreshToken({ id: newUser.id });
            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: "/api/user/refreshtoken",
            });

            res.json({ newUser, accesstoken });
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    signin: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const findUser = await prisma.user.findUnique({
                where: {
                    email: String(email),
                },
            });
            //check if user is exist
            if (!findUser) {
                return res.status(400).json({
                    msg: "user not found",
                });
            }
            //compare password
            const isMatch = await bcrypt.compare(
                String(password),
                String(findUser.password)
            );
            if (!isMatch) {
                return res.status(400).json({
                    msg: "email or password is incorrect",
                });
            }

            //if login success, create access token and refresh token
            const accesstoken = createAccessToken({ id: findUser.id });
            const refreshtoken = createRefreshToken({ id: findUser.id });

            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: "/api/user/refreshtoken",
            });

            res.json({ accesstoken });
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    signout: (req: Request, res: Response) => {
        try {
            res.clearCookie("refreshtoken", { path: "/api/user/refreshtoken" });
            return res.json("Logout successful");
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    getInfo: async (req: Request, res: Response) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(req.user.id),
                },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    cart: true,
                },
            });
            //check if user exists
            if (!user) {
                return res.status(400).json({
                    msg: "User not found",
                });
            }
            res.json({ user });
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    refreshToken: (req: Request, res: Response) => {
        try {
            const token = req.cookies.refreshtoken;
            if (!token) {
                res.status(400).json({
                    msg: "invalid token",
                });
            }
            //verify user token
            jwt.verify(
                token,
                process.env.REFRESH_TOKEN_SECRET as string,
                (err: any, user: any) => {
                    if (err) {
                        return res.status(400).json({
                            msg: "invalid token",
                        });
                    }
                    const accesstoken = createAccessToken({ id: user.id });
                    res.json({ user, accesstoken });
                }
            );
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
};

const createAccessToken = (user: any) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: "1d",
    });
};
const createRefreshToken = (user: any) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: "7d",
    });
};

export default userCtrl;
