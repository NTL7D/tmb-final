"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(400).json({
                msg: "Invalid authenication",
            });
        }
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({
                    msg: "Invalid Authentication",
                });
            }
            req.user = user;
            next();
        });
    }
    catch (err) {
        res.status(500).json({
            msg: err.message,
        });
    }
};
exports.default = auth;
