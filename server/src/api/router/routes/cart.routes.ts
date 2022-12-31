import { Router } from "express";
import cartCtrl from "../../controllers/cartCtrl";
import auth from "./../../middleware/auth";

export const cartRouter = Router();

cartRouter.route("/").post(auth, cartCtrl.addCart);
cartRouter.route("/:id").get(auth, cartCtrl.getCart);
cartRouter.route("/item").put(cartCtrl.updateAmount);
