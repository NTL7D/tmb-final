import { Router } from "express";
import auth from "../../middleware/auth";
import adminAuth from "../../middleware/admin";
import paymentCtrl from "../../controllers/paymentCtrl";

export const paymentRouter = Router();

paymentRouter
    .route("/")
    .get(auth, adminAuth, paymentCtrl.getPayment)
    .post(auth, paymentCtrl.savePayment);
