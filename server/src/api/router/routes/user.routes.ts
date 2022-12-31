import { Router } from "express";
import auth from "../../middleware/auth";
import userCtrl from "../../controllers/userCtrl";

export const userRouter = Router();

userRouter.post("/signup", userCtrl.signup);
userRouter.post("/signin", userCtrl.signin);
userRouter.get("/signout", userCtrl.signout);
userRouter.get("/info", auth, userCtrl.getInfo);
userRouter.get("/refreshtoken", userCtrl.refreshToken);
