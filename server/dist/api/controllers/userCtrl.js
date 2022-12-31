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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userCtrl = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        try {
            // check duplicate email
            const findUser = yield prisma_1.default.user.findUnique({
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
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashPass = yield bcrypt_1.default.hash(String(password), salt);
            //register
            const newUser = yield prisma_1.default.user.create({
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
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    signin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const findUser = yield prisma_1.default.user.findUnique({
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
            const isMatch = yield bcrypt_1.default.compare(String(password), String(findUser.password));
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
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    signout: (req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/api/user/refreshtoken" });
            return res.json("Logout successful");
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    getInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma_1.default.user.findUnique({
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
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    }),
    refreshToken: (req, res) => {
        try {
            const token = req.cookies.refreshtoken;
            if (!token) {
                res.status(400).json({
                    msg: "invalid token",
                });
            }
            //verify user token
            jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(400).json({
                        msg: "invalid token",
                    });
                }
                const accesstoken = createAccessToken({ id: user.id });
                res.json({ user, accesstoken });
            });
        }
        catch (err) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
};
const createAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};
const createRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
exports.default = userCtrl;
